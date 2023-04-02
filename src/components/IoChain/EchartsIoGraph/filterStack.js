export function filterStackGetNext(filterStack, setFilterStack) {
  if (filterStack.currentFilter + 1 > filterStack.stack.length - 1) {
    return;
  }

  let newFilterStack = {
    ...filterStack,
    currentFilter: filterStack.currentFilter + 1,
  };
  setFilterStack(newFilterStack);
  return newFilterStack.stack[newFilterStack.currentFilter];
}

export function filterStackGetPrevious(filterStack, setFilterStack) {
  if (filterStack.currentFilter - 1 < 0) {
    return;
  }
  let newFilterStack = {
    ...filterStack,
    currentFilter: filterStack.currentFilter - 1,
  };
  setFilterStack(newFilterStack);
  return newFilterStack.stack[newFilterStack.currentFilter];
}

export function filterStackUpdate(filterStack, filter, setFilterStack) {
  let lastFilterValue = filterStack.stack[filterStack.stack.length - 1];
  let lastStackFilterIdentical =
    JSON.stringify(lastFilterValue) === JSON.stringify(filter);

  if (filter.updatedBy === "nextPreviousButtons") {
    setFilterStack((prevFilterStack) => ({
      ...prevFilterStack,
    }));
    return;
  }

  let filterStackCopy = [...filterStack.stack];
  let filterStackLenIndex = filterStackCopy.length - 1;
  if (filterStack.currentFilter !== filterStackLenIndex) {
    for (let i = 0; i < filterStackLenIndex - filterStack.currentFilter; i++) {
      filterStackCopy.pop();
    }
  }

  if (lastStackFilterIdentical) {
    setFilterStack((prevFilterStack) => ({
      ...prevFilterStack,
      currentFilter: prevFilterStack.stack.length - 1,
    }));
  } else {
    filterStackCopy.push(filter);
    setFilterStack((prevFilterStack) => ({
      ...prevFilterStack,
      stack: filterStackCopy,
      currentFilter: filterStack.currentFilter + 1,
    }));
  }
  return;
}
