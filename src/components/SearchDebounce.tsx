"use client";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import SearchIcon from "@mui/icons-material/Search";
import { List, ListItemButton, ListItemText } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchDebounce = () => {
  const [inputValue, setInputValue] = useState("");

  const debounceSearch = useDebounce(inputValue, 700);

  const { data } = trpc.getDebounceProducts.useQuery({
    query: {
      category: inputValue,
      type: debounceSearch,
    },
    limit: 100,
  });

  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    if (data?.items?.length === 0) {
      setActiveIndex(null);
    } else {
      setActiveIndex(0);
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [data]);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  const router = useRouter();

  return (
    <div ref={navRef}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          onClick={() => setActiveIndex(0)}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={"Search…"}
          inputProps={{ "aria-label": "search" }}
        />

        {!!debounceSearch && isAnyOpen && (data?.items?.length ?? 0) > 0 && (
          <List
            sx={{
              zIndex: 10000,
              position: "absolute",
              width: "100%",
              backgroundColor: "#9a3412",
              borderRadius: "4px",
            }}
          >
            {data?.items.map(({ name, id }) => (
              <React.Fragment key={id}>
                <ListItemButton
                  sx={{ color: "white" }}
                  onClick={() => {
                    setActiveIndex(null);
                    router.push(`/product/${id}`);
                  }}
                >
                  {name}
                </ListItemButton>
              </React.Fragment>
            ))}
          </List>
        )}
      </Search>
    </div>
  );
};

export default SearchDebounce;
