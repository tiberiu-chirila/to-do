import { createContext, useContext, useEffect, useRef, useState } from "react";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    padding: "4px",
    borderRadius: "5px",
    display: "flex",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  menu: {
    border: "2px solid black",
    borderRadius: "5px",
    width: "10%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  menuItem: {
    height: "40px",
    width: "calc(100% - 12px)",
    backgroundColor: "#FCD195",
    boxSizing: "border-box",
    padding: "4px",
    margin: "6px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "100%",
    boxSizing: "border-box",
  },
  header: {
    border: "2px solid black",
    borderRadius: "5px",
    marginLeft: "auto",
    marginRight: "4px",
    padding: "5px",
    boxSizing: "border-box",
  },
  body: {
    display: "flex",
    justifyContent: "space-between",
    height: "calc(100vh - 48px)",
  },
  panelSection: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    margin: "4px",
    border: "2px solid green",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  panelSubSection: {
    border: "2px solid blue",
    width: "calc(100% - 16px)",
    margin: "4px",
  },
  panelSubSectionTitle: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  chevron: {
    marginRight: "10px",
    cursor: "pointer",
  },
  panelSelection: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  scrollButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5em",
  },
  panel: {
    backgroundColor: "#F5F5F5",
    border: "2px solid black",
    borderRadius: "5px",
    minWidth: "400px",
    maxWidth: "400px",
    height: "400px",
    margin: "4px",
    boxSizing: "border-box",
  },
  notifications: {
    border: "2px solid black",
    borderRadius: "5px",
    height: "100%",
    width: "400px",
    minWidth: "400px",
    margin: "4px",
    boxSizing: "border-box",
  },
};

const PinnedContext = createContext();

export default function Dashboard() {
  return (
    <PinnedProvider>
      <div style={styles.container}>
        <div style={styles.menu}>
          <div style={styles.menuItem}>Map</div>
          <div style={styles.menuItem}>Staff Management</div>
          <div style={styles.menuItem}>Sites Management</div>
        </div>
        <div style={styles.content}>
          <div style={styles.header}>Hi, Dan</div>
          <div style={styles.body}>
            <div style={styles.panelSection}>
              <ExpandableSubSection title="Pinned Panels" expandedInitially={true}>
                <ScrollablePanels>
                  <PinnedPanels />
                </ScrollablePanels>
              </ExpandableSubSection>
              <ExpandableSubSection title="Operations">
                <ScrollablePanels>
                  <Panel title="Booking Analytics">Content</Panel>
                  <Panel title="Driver Analytics">Content</Panel>
                  <Panel title="Driver Support">Content</Panel>
                  <Panel title="Customer Analytics">Content</Panel>
                  <Panel title="Customer Support">Content</Panel>
                </ScrollablePanels>
              </ExpandableSubSection>
              <ExpandableSubSection title="Sales">
                <ScrollablePanels>
                  <Panel title="Sales Panel 1">Content</Panel>
                  <Panel title="Sales Panel 2">Content</Panel>
                  <Panel title="Sales Panel 3">Content</Panel>
                </ScrollablePanels>
              </ExpandableSubSection>
              <ExpandableSubSection title="Finance">
                <ScrollablePanels>
                  <Panel title="Finance Panel 1">Content</Panel>
                  <Panel title="Finance Panel 2">Content</Panel>
                </ScrollablePanels>
              </ExpandableSubSection>
            </div>
            <div style={styles.notifications}>Notification Timeline</div>
          </div>
        </div>
      </div>
    </PinnedProvider>
  );
}

function ExpandableSubSection({ title, expandedInitially = false, children }) {
  const [isExpanded, setIsExpanded] = useState(expandedInitially);

  return (
    <div style={styles.panelSubSection}>
      <h1 style={styles.panelSubSectionTitle} onClick={() => setIsExpanded(!isExpanded)}>
        <span style={styles.chevron}>{isExpanded ? "▼" : "►"}</span>
        {title}
      </h1>
      {isExpanded && children}
    </div>
  );
}

function ScrollablePanels({ children }) {
  const scrollRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  useEffect(() => {
    const checkOverflow = () => {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isOverflowing && (
        <button style={styles.scrollButton} onClick={() => scrollLeft()}>
          {"<"}
        </button>
      )}
      <div style={styles.panelSelection} ref={scrollRef}>
        {children}
      </div>
      {isOverflowing && (
        <button style={styles.scrollButton} onClick={() => scrollRight()}>
          {">"}
        </button>
      )}
    </div>
  );
}

function Panel({ title, children }) {
  const { pinnedPanels, togglePin } = usePinned();
  const isPinned = pinnedPanels.some((panel) => panel.title === title);

  return (
    <div style={styles.panel}>
      <div>
        <input type="checkbox" checked={isPinned} onChange={() => togglePin({ title, children })} />
        <strong>{title}</strong>
      </div>
      {children}
    </div>
  );
}

function PinnedProvider({ children }) {
  const [pinnedPanels, setPinnedPanels] = useState([]);

  const togglePin = (panel) => {
    setPinnedPanels((prev) =>
      prev.some((p) => p.title === panel.title)
        ? prev.filter((pinnedPanel) => pinnedPanel.title !== panel.title)
        : [...prev, panel]
    );
  };

  return <PinnedContext.Provider value={{ pinnedPanels, togglePin }}>{children}</PinnedContext.Provider>;
}

function usePinned() {
  return useContext(PinnedContext);
}

function PinnedPanels() {
  const { pinnedPanels } = usePinned();

  return pinnedPanels.map(({ title, children }) => <Panel title={title}>{children}</Panel>);
}
