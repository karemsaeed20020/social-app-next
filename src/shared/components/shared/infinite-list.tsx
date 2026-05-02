"use client";

import { useInView } from "react-intersection-observer";

interface QueryResult<T> {
  data?: {
    pages: T[];
    pageParams: unknown[];
  };
  isPending: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

interface InfiniteListProps<T> {
  queryResult: QueryResult<T>;
  renderItem: (item: T) => React.ReactNode;
  skeleton: React.ReactNode;
  emptyComponent: React.ReactNode;
  endComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
  loaderClassName?: string;
}

export function InfiniteList<T>({
  queryResult,
  renderItem,
  skeleton,
  emptyComponent,
  endComponent,
  errorComponent,
  className = "flex flex-col gap-4 overflow-x-hidden",
  loaderClassName = "w-full overflow-hidden",
}: InfiniteListProps<T>) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = queryResult;

  const { ref } = useInView({
    rootMargin: "500px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isPending) {
    return <>{skeleton}</>;
  }

  if (isError) {
    return <>{errorComponent}</>;
  }

  const items = data?.pages || [];

  return (
    <div className={className}>
      {items.length > 0 ? (
        items.map((item, index) => <div key={index}>{renderItem(item)}</div>)
      ) : (
        <div className="flex justify-center w-full">{emptyComponent}</div>
      )}

      <div ref={ref} className={loaderClassName}>
        {isFetchingNextPage ? (
          <>{skeleton}</>
        ) : (
          !hasNextPage && items.length > 0 && endComponent
        )}
      </div>
    </div>
  );
}
