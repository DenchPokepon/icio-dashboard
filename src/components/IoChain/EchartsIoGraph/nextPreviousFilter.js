import { filterStackGetNext, filterStackGetPrevious } from "./filterStack";

export function nextFilter(filterStack, setFilterStack, setFilter) {
  if (filterStack.currentFilter + 1 > filterStack.stack.length - 1) {
    return;
  }

  setFilter({
    ...filterStackGetNext(filterStack, setFilterStack),
    updatedBy: "nextPreviousButtons",
  });
  return;
}

export function previousFilter(filterStack, setFilterStack, setFilter) {
  if (filterStack.currentFilter - 1 < 0) {
    return;
  }

  setFilter({
    ...filterStackGetPrevious(filterStack, setFilterStack),
    updatedBy: "nextPreviousButtons",
  });
  return;
}

export function nextPreviousButtonsColorsUpdate(filterStack, filterValues) {
  // let lastFilterValue = filterStack.stack[filterStack.stack.length - 1];
  // let lastStackFilterIdentical =
  //   JSON.stringify(lastFilterValue) === JSON.stringify(filterValues);

  if (
    filterStack.currentFilter + 1 > filterStack.stack.length - 1//||
    //lastStackFilterIdentical
  ) {
    document.documentElement.style.setProperty(
      "--background-color-static-next",
      "#a0bcf8"
    );
    document.documentElement.style.setProperty(
      "--background-color-hover-next",
      "#a0bcf8"
    );
  } else {
    document.documentElement.style.setProperty(
      "--background-color-static-next",
      "#2551b3"
    );
    document.documentElement.style.setProperty(
      "--background-color-hover-next",
      "#2f67de"
    );
  }

  if (filterStack.currentFilter - 1 < 0) {
    document.documentElement.style.setProperty(
      "--background-color-static-previous",
      "#a0bcf8"
    );
    document.documentElement.style.setProperty(
      "--background-color-hover-previous",
      "#a0bcf8"
    );
  } else {
    document.documentElement.style.setProperty(
      "--background-color-static-previous",
      "#2551b3"
    );
    document.documentElement.style.setProperty(
      "--background-color-hover-previous",
      "#2f67de"
    );
  }
  return;
}
