import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";

function MoreOptionsMenu() {
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef();
  const popoverRef = createRef();

  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "top",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-sm text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        data-popover-target="more-options"
        data-popover-trigger="click"
        onClick={() => {
          popoverShow ? closePopover() : openPopover();
        }}
        ref={btnRef}
        type="button"
      >
        <i className="glyphicon glyphicon-menu-hamburger"></i>
        <span className="sr-only">more options</span>
      </button>
      <div
        data-popover
        id="more-options"
        role="tooltip"
        className={
          (popoverShow ? "" : "hidden ") +
          "absolute z-10  inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        }
        ref={popoverRef}
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Popover title
          </h3>
        </div>
        <div className="px-3 py-2">
          <p>And here's some amazing content. It's very engaging. Right?</p>
        </div>
        <div data-popper-arrow></div>
      </div>
    </>
  );
}

export default function Caption(props) {
  return (
    <div className="flex flex-row basis-full space-x-2 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <input
        placeholder="Add Caption"
        type="text"
        id="small-input"
        className="block w-full p-2 text-gray-900 rounded-sm border border-gray-300 bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      />

      <MoreOptionsMenu />

      <button
        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-sm text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 "
        data-popover-target="more-options"
        data-popover-trigger="click"
        type="button"
      >
        <i className="glyphicon glyphicon-trash"></i>
        <span className="sr-only">delete caption</span>
      </button>
    </div>
  );
}
