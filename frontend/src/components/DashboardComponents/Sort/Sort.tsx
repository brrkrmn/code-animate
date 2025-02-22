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
    <Dropdown
      backdrop="blur"
      classNames={{
        content: "gradientBg gradientBorder shadow-medium",
      }}
    >
      <DropdownTrigger className="outline-none">
        <button className="flex items-center justify-center gap-2 w-fit px-5 py-1 rounded-full border-small border-divider bg-content1 text-foreground-100 hover:text-foreground-50 hover:shadow-small transition">
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
        itemClasses={{
          base: "text-foreground border-small rounded-full data-[selected=true]:text-foreground-50 data-[selected=true]:shadow-large",
        }}
      >
        {sortingOptions.map((section, index) => (
          <DropdownSection
            classNames={{ base: "text-foreground-50" }}
            key={index}
            showDivider
            title={section.title}
          >
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
