import { useMemo } from "react"
import styled from "styled-components"
import Icon from "@/components/general/Icon"
import Button from "@/components/general/Button"

export interface PaginationMainProps extends React.HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPaging?: (page: number) => void
}

const PaginationMain = (props: PaginationMainProps) => {
  const { page, totalPages, className = "", onPaging, ...restProps } = props

  const paging = useMemo(() => {
    if (!totalPages) return []
    const size = 5
    const start = Math.max(Math.floor((page - 1) / size) * size + 1, 1)
    const end = Math.min(start + (size - 1), totalPages)
    return [...Array(end - start + 1).keys()].map((i) => i + start)
  }, [page, totalPages])

  if (!totalPages) {
    return null
  }

  return (
    <PaginationMainContainer role="navigation" className={`${className}`} {...restProps}>
      <Button
        type="button"
        variants="secondary"
        disabled={page === 1}
        prefixEl={() => <Icon name="Left" label="이전 페이지" />}
        onClick={() => onPaging?.(page - 1)}
      />
      {paging.map((number) => (
        <Button
          key={number}
          type="button"
          variants="secondary"
          aria-current={number === page}
          onClick={() => onPaging?.(number)}
        >
          <span>{number}</span>
          {number === page && <span className="sr-only">(현재 페이지)</span>}
        </Button>
      ))}
      <Button
        type="button"
        variants="secondary"
        disabled={page === totalPages}
        prefixEl={() => <Icon name="Right" label="다음 페이지" />}
        onClick={() => onPaging?.(page + 1)}
      />
    </PaginationMainContainer>
  )
}

const PaginationMainContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
  button {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    font-size: ${(props) => props.theme.typo.size.sm};
    line-height: ${(props) => props.theme.typo.leading.sm};
    svg {
      margin: 0 auto;
      width: 16px;
    }
    &:disabled {
      color: rgb(var(--color-neutral700));
    }
    &:not(:disabled):hover {
      color: rgb(var(--color-primary500));
      background: rgb(var(--color-neutral100));
      border-color: rgb(var(--color-primary500));
    }
    &:not(:disabled):focus-visible {
      outline: 4px solid rgb(var(--color-primary300));
      outline-offset: 1px;
    }
    &:not(:disabled)[aria-current="true"] {
      color: rgb(var(--color-primary600));
      border: 1px solid rgb(var(--color-primary600));
    }
  }
`

export default PaginationMain
