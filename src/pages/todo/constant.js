const TODOS = [
  {
    id: 1,
    name: "Work on project",
    status: "progress",
  },
  {
    id: 2,
    name: "Eat breakfast",
    status: "done",
  },
  {
    id: 3,
    name: "Commit on github",
    status: "progress",
  },
  {
    id: 4,
    name: "Merge the PRs",
    status: "done",
  },
];

const getAttributeByType = (event,type='container-id') => event.getAttribute(type);
const handleDragOver = (e) => {
  e.preventDefault();
};
const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export {
    TODOS,
    getAttributeByType,
    handleDragOver,
    debounce
} 
