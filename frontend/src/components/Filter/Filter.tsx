import { useScenesContext } from "@/context/scenes";
import type { Selection } from "@nextui-org/react";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { Language } from "../Toolbar/components/LanguageSelector";

const Filter = () => {
  const { scenes, setFilteredScenes } = useScenesContext();
  const [langs, setLangs] = useState<Language[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    const uniqueLangs = Array.from(
      new Set(scenes.map((scene) => scene.language))
    );

    const uniqueThemes = Array.from(
      new Set(scenes.map((scene) => scene.theme as string))
    );

    setLangs(uniqueLangs);
    setThemes(uniqueThemes);
  }, []);

  useEffect(() => {
    if (selectedKeyCount === 0) {
      setFilteredScenes(scenes);
    } else {
      const langFilters = Array.from(selectedKeys)
        .filter((key) => String(key).includes("lang-"))
        .map((key) => String(key).split("-")[1]);

      const themeFilters = Array.from(selectedKeys)
        .filter((key) => String(key).includes("theme-"))
        .map((key) => String(key).split("-")[1]);

      const filteredSnippets = scenes.filter((scene) =>
        langFilters.length > 0 && themeFilters.length > 0
          ? langFilters.includes(scene.language) &&
            themeFilters.includes(scene.theme as string)
          : langFilters.length > 0
          ? langFilters.includes(scene.language)
          : themeFilters.includes(scene.theme as string)
      );
      setFilteredScenes(filteredSnippets);
    }
  }, [selectedKeys]);

  const filteringOptions = [
    {
      key: "lang",
      title: "Filter by Language",
      items: langs.map((lang) => ({ key: lang, content: lang })),
    },
    {
      key: "theme",
      title: "Filter by Theme",
      items: themes.map((theme) => ({ key: theme, content: theme })),
    },
  ];

  const selectedKeyCount = Array.from(selectedKeys).length;

  return (
    <Dropdown backdrop="blur">
      <Badge
        isInvisible={selectedKeyCount === 0}
        content={selectedKeyCount <= 5 ? selectedKeyCount : "+5"}
      >
        <DropdownTrigger>
          <button>
            <IoOptionsOutline />
            <p>Filter</p>
          </button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        variant="bordered"
        selectionMode="multiple"
      >
        {filteringOptions.map((section, index) => (
          <DropdownSection key={index} title={section.title} showDivider>
            {section.items.map((item) => (
              <DropdownItem key={`${section.key}-${item.key}`}>
                {item.content}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
