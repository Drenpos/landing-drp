import React, { useEffect, useRef, useState } from "react";

const Accordion = ({
  title,
  children,
  className,
  isActive = false,
  exclusiveOpen = false,
  exclusiveOpenGroup,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  exclusiveOpen?: boolean;
  exclusiveOpenGroup?: string;
}) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const contentRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleExclusiveOpen = (e: CustomEvent) => {
      if (e.detail.group === exclusiveOpenGroup && e.detail.accordion !== accordionRef.current) {
        setIsOpen(false);
      }
    };

    if (exclusiveOpen && exclusiveOpenGroup) {
      document.addEventListener('accordionOpen' as any, handleExclusiveOpen as EventListener);
    }

    return () => {
      if (exclusiveOpen && exclusiveOpenGroup) {
        document.removeEventListener('accordionOpen' as any, handleExclusiveOpen as EventListener);
      }
    };
  }, [exclusiveOpen, exclusiveOpenGroup]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (exclusiveOpen && exclusiveOpenGroup) {
      const event = new CustomEvent('accordionOpen', {
        detail: { group: exclusiveOpenGroup, accordion: accordionRef.current }
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <div
      ref={accordionRef}
      className={`accordion ${isOpen ? "active" : ""} ${className ?? ""}
        lg:col-8 bg-light px-5 py-2 rounded-xl mb-3`}
      data-exclusive-open={exclusiveOpen}
      data-accordion-group={exclusiveOpenGroup}
    >
      <details className="group peer" open={isOpen}>
        <summary className="accordion-header text-xl !p-5 justify-between" onClick={toggleAccordion}>
          <span>{title}</span>
          <span className={`icon-toggle transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            {isOpen ? "-" : "+"}
          </span>
        </summary>
      </details>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="p-5 pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
