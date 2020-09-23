import React, { useEffect, useState } from "react";

export default function ComboBox({
  name = "",
  value = "",
  items = [],
  display = "block",
  onChange,
  mutateItem,
  navs = {},
  ...inputProps
}) {
  const [select, setSelect] = useState({
    value: "",
    label: "",
    input: "",
  });

  const [option, setOption] = useState({
    isCollapsed: true,
    items: items,
    mutation: (item) => item,
  });

  const resetSelect = (ev) => {
    setSelect({
      ...select,
      value: "",
      label: "",
      input: "",
    });
    setOption((prevOption) => {
      return { ...prevOption, isCollapsed: false };
    });
    // console.log(select);
  };

  const toggleOption = (ev) => {
    // console.log(ev);
    if (select.input) return;
    setOption((prevOption) => ({
      ...prevOption,
      isCollapsed: !prevOption.isCollapsed,
    }));
  };

  const handleBlur = (ev) => {
    // console.log(select);
    setTimeout(() => {
      setOption((prevOption) => ({
        ...prevOption,
        isCollapsed: true,
      }));
    }, 400);
    setSelect((prevSelect) => {
      if (!prevSelect.value) return { ...prevSelect, label: "", input: "" };
      return prevSelect;
    });
  };

  const changeInput = (ev) => {
    if (select.input) setOption({ ...option, isCollapsed: false });
    setSelect({
      ...select,
      value: "",
      label: ev.target.value,
      input: ev.target.value,
    });
    console.log("select value", select.value);
  };

  const selectItem = ({ target: { dataset } }) => {
    setSelect({
      ...select,
      value: dataset.value,
      label: dataset.label,
      input: "",
    });
    setOption({ ...option, isCollapsed: true });
  };

  useEffect(() => {
    // if (!select.value) return;
    if (typeof onChange === "function") {
      // Build dummy event object
      const event = {
        target: {
          name: name,
          value: select.value,
        },
      };
      onChange(event);
    }
  }, [select.value, name, onChange]);

  useEffect(() => {
    if (typeof mutateItem === "function") {
      setOption((prevOption) => ({ ...prevOption, mutation: mutateItem }));
    }
  }, [mutateItem]);

  // console.log(navs);

  return (
    <div
      style={{
        position: "relative",
        display: display,
        fontSize: "0.875rem",
      }}>
      <div
        style={{
          position: "absolute",
          // top: "-0.5rem",
          right: "0",
          fontWeight: "500",
          fontSize: "1rem",
          color: "rgba(74, 85, 104, 0.6)",
          cursor: "pointer",
        }}>
        {/* {navs["reset"]} */}
        {!!select.value && <div onClick={resetSelect}>{navs["reset"]}</div>}
        {!select.value && (
          <div onClick={toggleOption}>
            {option.isCollapsed ? navs["close"] : navs["open"]}
          </div>
        )}
      </div>
      <input
        type="text"
        name={name}
        value={select.label}
        // data-value={select.value}
        onClick={toggleOption}
        onChange={changeInput}
        onBlur={handleBlur}
        {...inputProps}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          marginTop: "0.5rem",
          borderWidth: "1px",
          borderRadius: "0.25rem",
          overflow: "hidden",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          backgroundColor: "white",
          display: option.isCollapsed ? "none" : "block",
        }}>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "50vh", minHeight: "1.5rem", cursor: "pointer" }}>
          {option.items
            .filter((item) => {
              if (!select.input) return true;
              const itemValue = String(item.value).toLowerCase();
              const itemLabel = String(item.label).toLowerCase();
              const selectInput = select.input.toLowerCase();
              return (
                itemValue.indexOf(selectInput) > -1 ||
                itemLabel.indexOf(selectInput) > -1
              );
            })
            .map((item) => {
              // mutate item object
              item = option.mutation(item);
              const { value, label, ...itemProps } = item;
              return (
                <div
                  key={value}
                  data-value={value}
                  data-label={label}
                  onClick={selectItem}
                  {...itemProps}>
                  {label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
