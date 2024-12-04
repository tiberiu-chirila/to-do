import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  pageHeader: {
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
    overflowY: "auto",
    boxSizing: "border-box",
  },
  panelSubSection: {
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
  panelHeader: {
    backgroundColor: "#F7DF9C",
    height: "40px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
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
  notficationItem: {
    height: "40px",
    width: "calc(100% - 12px)",
    backgroundColor: "rgba(181, 40, 40, 0.6)",
    boxSizing: "border-box",
    padding: "4px",
    margin: "6px",
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
          <div style={styles.pageHeader}>Hi, Dan</div>
          <div style={styles.body}>
            <div style={styles.panelSection}>
              <ExpandableSubSection title="Pinned Panels" expandedInitially={true}>
                <ScrollableArea>
                  <PinnedPanels />
                </ScrollableArea>
              </ExpandableSubSection>
              <ExpandableSubSection title="Operations">
                <ScrollableArea>
                  <Panel id="ops-01" title="Booking Analytics">
                    Content
                  </Panel>
                  <Panel id="ops-02" title="Driver Analytics">
                    Content
                  </Panel>
                  <Panel id="ops-03" title="Driver Support">
                    Content
                  </Panel>
                  <Panel id="ops-04" title="Customer Analytics">
                    Content
                  </Panel>
                  <Panel id="ops-05" title="Customer Support">
                    Content
                  </Panel>
                </ScrollableArea>
              </ExpandableSubSection>
              <ExpandableSubSection title="Sales">
                <ScrollableArea>
                  <Panel id="sales-01" title="Sales Panel 1">
                    Content
                  </Panel>
                  <Panel id="sales-02" title="Sales Panel 2">
                    Content
                  </Panel>
                  <Panel id="sales-03" title="Sales Panel 3">
                    Content
                  </Panel>
                </ScrollableArea>
              </ExpandableSubSection>
              <ExpandableSubSection title="Finance">
                <ScrollableArea>
                  <Panel id="finance-01" title="Finance Panel 1">
                    Content
                  </Panel>
                  <Panel id="finance-02" title="Finance Panel 2">
                    Content
                  </Panel>
                </ScrollableArea>
              </ExpandableSubSection>
            </div>
            <div style={styles.notifications}>
              <div style={styles.notficationItem}>Emergency Notification 1</div>
              <div style={styles.notficationItem}>Emergency Notification 2</div>
              <div style={styles.notficationItem}>Emergency Notification 3</div>
            </div>
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

function ScrollableArea({ children }) {
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

function Panel({ id, title, children }) {
  const { pinnedPanels, togglePin } = usePinned();
  const isPinned = pinnedPanels.some((panel) => panel.title === title);

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <input type="checkbox" checked={isPinned} onChange={() => togglePin({ id: `pin-${id}`, title, children })} />
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

  const movePanel = (sourceIndex, destinationIndex) => {
    const reorderedPanels = [...pinnedPanels];
    const [movedPanel] = reorderedPanels.splice(sourceIndex, 1);
    reorderedPanels.splice(destinationIndex, 0, movedPanel);
    setPinnedPanels(reorderedPanels);
  };

  return <PinnedContext.Provider value={{ pinnedPanels, togglePin, movePanel }}>{children}</PinnedContext.Provider>;
}

function usePinned() {
  return useContext(PinnedContext);
}

function PinnedPanels() {
  let { pinnedPanels, movePanel } = usePinned();

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    if (type === "PINNED") {
      movePanel(source.index, destination.index);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="PINNED-PANELS" type="PINNED">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            {pinnedPanels.map((panel, index) => (
              <Draggable key={panel.id} draggableId={panel.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Panel id={panel.id} title={panel.title} index={index}>
                      {panel.children}
                    </Panel>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

const StrictModeDroppable = ({ droppableId, type, children }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={droppableId} type={type} direction="horizontal" ignoreContainerClipping={true}>
      {children}
    </Droppable>
  );
};
