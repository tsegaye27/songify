import React from "react";
import styled from "@emotion/styled";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--accent-color);
  outline: none;
  border-radius: var(--radius-md);
  background-color: ${(props) =>
    props.isActive ? "var(--primary-color)" : "var(--background-color)"};
  color: ${(props) => (props.isActive ? "#000" : "var(--text-color)")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all var(--transition-fast);
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.isActive ? "var(--secondary-color)" : "var(--accent-color)"};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin: 0 1rem;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <Container>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <BiChevronLeft />
      </PageButton>

      {getVisiblePages().map((page, index) => (
        <PageButton
          key={index}
          isActive={page === currentPage}
          disabled={typeof page === "string"}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <BiChevronRight />
      </PageButton>

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
    </Container>
  );
};

export default Pagination;
