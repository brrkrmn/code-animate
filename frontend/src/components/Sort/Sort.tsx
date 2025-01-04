import { useScenesContext } from "@/context/scenes";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  type Selection,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";

const Sort = () => {
  const { setFilteredScenes, filteredScenes } = useScenesContext();
  const [selectedKey, setSelectedKey] = useState<Selection>(
    new Set(["date-old"])
  );

  useEffect(() => {
    const sortingKey = Array.from(selectedKey)[0];
    let sortedScenes = filteredScenes;

    if (sortingKey === "alphabetical-asc") {
      sortedScenes = [...filteredScenes].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    } else if (sortingKey === "alphabetical-desc") {
      sortedScenes = [...filteredScenes].sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );
    } else if (sortingKey === "date-new") {
      sortedScenes = [...filteredScenes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortingKey === "date-old") {
      sortedScenes = [...filteredScenes].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    setFilteredScenes(sortedScenes);
  }, [selectedKey]);

  const sortingOptions = [
    {
      title: "Sort by Title",
      items: [
        { key: "alphabetical-asc", content: "A - Z" },
        { key: "alphabetical-desc", content: "Z - A" },
      ],
    },
    {
      title: "Sort by Date",
      items: [
        { key: "date-new", content: "Newest first" },
        { key: "date-old", content: "Oldest first" },
      ],
    },
  ];

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button>
          <TbArrowsSort />
          <p>Sort</p>
        </button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selectedKey}
        onSelectionChange={setSelectedKey}
        defaultSelectedKeys={["dateNew"]}
        variant="bordered"
        selectionMode="single"
      >
        {sortingOptions.map((section, index) => (
          <DropdownSection key={index} showDivider title={section.title}>
            {section.items.map((item) => (
              <DropdownItem key={item.key}>{item.content}</DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Sort;
