import { Button, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import RemoveModal from "./RemoveModal";
import MenuItems from "./MenuItems";

export default () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [removeModalOpened, setRemoveModalOpened] = useState(false);

  const accentColor = useAppSelector((state) => state.accentColor);

  return (
    <>
      <RemoveModal
        opened={removeModalOpened}
        setOpened={setRemoveModalOpened}
      />
      <Menu
        opened={menuOpened}
        onChange={setMenuOpened}
        transitionProps={{ transition: "scale-y" }}
        position="top-end"
        width={200}
        closeOnItemClick={false}
        withinPortal
      >
        <Menu.Target>
          <Button
            sx={{ color: accentColor, borderColor: accentColor }}
            variant="outline"
            rightIcon={<IconChevronDown size={18} stroke={2} />}
            pr={12}
            loaderPosition="right"
          >
            Options
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <MenuItems
            setMenuOpened={setMenuOpened}
            setRemoveModalOpened={setRemoveModalOpened}
          />
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
