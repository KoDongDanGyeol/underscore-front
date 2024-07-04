import styled, { css } from "styled-components"

export interface MapHeadlineProps extends React.HTMLAttributes<HTMLElement> {
  prefixEl?: React.ElementType
  suffixEl?: React.ElementType
}

const MapHeadline = (props: MapHeadlineProps) => {
  const { prefixEl: PrefixEl = null, suffixEl: SuffixEl = null, className = "", ...restProps } = props

  return (
    <MapHeadlineContainer className={`${className}`} {...restProps}>
      {PrefixEl && <MapHeadlinePrefix as={PrefixEl} />}
      {SuffixEl && <MapHeadlineSuffix as={SuffixEl} />}
    </MapHeadlineContainer>
  )
}

const MapHeadlineUtils = css`
  display: inline-flex;
  :is(a, button) {
    padding: 8px;
  }
`

const MapHeadlinePrefix = styled.div`
  ${MapHeadlineUtils}
  margin-right: auto;
`

const MapHeadlineSuffix = styled.div`
  ${MapHeadlineUtils}
  margin-left: auto;
`

const MapHeadlineContainer = styled.header`
  display: flex;
  align-items: center;
  height: 36px;
`

export default MapHeadline
