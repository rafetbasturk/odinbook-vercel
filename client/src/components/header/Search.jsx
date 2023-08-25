import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { SearchWrapper, IconWrapper } from "../../assets/wrappers";
import { Profile } from "../";
import useUserContext from "../../hooks/useUserContext";
import useOutsideClick from "../../hooks/useOutsideClick";

const Search = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { search, handleChange, getUsers, users, clearSearch } = useUserContext();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  useOutsideClick(searchRef, setShowContent);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const delayForTyping = setTimeout(() => {
      if (search) getUsers()
      if (!search) clearSearch()
    }, 600)
    return () => clearTimeout(delayForTyping)
  }, [search])

  const handleSearchIconClick = () => {
    inputRef.current.focus()
    setShowContent(true)
  };

  const handleLinkClick = () => {
    setShowContent(false)
    clearSearch()
  };

  return (
    <SearchWrapper ref={searchRef}>
      <IconWrapper
        className="search-icon"
        onClick={handleSearchIconClick}
      >
        <MdSearch />
      </IconWrapper>
      <form className="input-container" autoComplete="off">
        <label
          htmlFor="search"
          className="search-label"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search friends by name or email"
            value={search}
            className={(!showContent && isMobile) ? "search" : "search show"}
            onClick={() => setShowContent(true)}
            onChange={e => handleChange({ name: e.target.name, value: e.target.value })}
            ref={inputRef}
          />
        </label>
      </form>

      <div className={!showContent ? "content" : "content on"}>
        {
          users?.map(user => {
            return (
              <Link
                to={`${user._id}`}
                key={user._id}
                onClick={handleLinkClick}
              >
                <Profile  {...user} type="search" />
              </Link>
            )
          })
        }
      </div>
    </SearchWrapper>
  );
}

export default Search