import { FC } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@shared/ui/pagination';
import { Button } from '@shared/ui/button';

interface PagePaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export const PagePagination: FC<PagePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <Pagination data-testid="pagination">
      <PaginationContent>
        <PaginationPrevious
          data-testid="pagination-prev"
          onClick={() => onPageChange(currentPage - 1 >= 1 ? currentPage - 1 : 1)}
        />
        {Array(totalPages)
          .fill(0)
          .map((_, i) => (
            <PaginationItem key={i}>
              <Button
                variant={i + 1 === currentPage ? 'outline' : 'default'}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </Button>
            </PaginationItem>
          ))}
        <PaginationNext
          data-testid="pagination-next"
          onClick={() => onPageChange(currentPage + 1 <= totalPages ? currentPage + 1 : totalPages)}
        />
      </PaginationContent>
    </Pagination>
  );
};
