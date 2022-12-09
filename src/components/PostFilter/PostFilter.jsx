import React from "react";
import Input from "../UI/input/Input";
import Select from "../UI/select/Select";
import classes from "./PostFilter.module.css";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div className={classes.filter}>
      <Input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Search..."
      />

      <Select
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sort by"
        options={[
          { value: "title", name: "By title" },
          { value: "body", name: "By description" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
