import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { NonUndefined, isEquals } from "@/libs/utils"
import Icon, { EnumIconName } from "@/components/general/Icon"
import { EnumPictureRounded } from "@/components/general/Picture"

export interface PictureMainProps extends React.HtmlHTMLAttributes<HTMLImageElement> {
  alt: string
  ratio?: [number, number]
  rounded?: EnumPictureRounded
  src: string
  fallbackText?: string
  fallbackIcon?: EnumIconName
  className?: string
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  onError?: React.ReactEventHandler<HTMLImageElement>
}

type TypeStructure = {
  src: string | null
  isLoaded: boolean
  isErrored: boolean
}

const PictureMain = (props: PictureMainProps) => {
  const {
    alt,
    ratio,
    rounded = EnumPictureRounded.None,
    src,
    fallbackText,
    fallbackIcon = "Picture",
    className = "",
    onLoad,
    onError,
    ...restProps
  } = props

  const [structure, setStructure] = useState<TypeStructure>({
    src: src ?? null,
    isLoaded: false,
    isErrored: false,
  })

  useEffect(() => {
    setStructure((prev) => ({
      ...prev,
      isLoaded: false,
      isErrored: false,
      src: src ?? null,
    }))
  }, [src])

  if (!structure.src || structure.isErrored) {
    return (
      <PictureMainContainer className={`${className}`} $ratio={ratio ?? [1, 1]} $rounded={rounded} $isFallback={true}>
        {fallbackText ? <span>{fallbackText}</span> : <Icon name={fallbackIcon} label={alt} />}
      </PictureMainContainer>
    )
  }

  return (
    <PictureMainContainer className={`${className}`} $ratio={ratio ?? [0, 0]} $rounded={rounded} $isFallback={false}>
      <img
        alt={alt}
        src={structure.src}
        onLoad={(event: React.SyntheticEvent<HTMLImageElement>) => {
          setStructure((prev) => ({ ...prev, isLoaded: true }))
          onLoad?.(event)
        }}
        onError={(event: React.SyntheticEvent<HTMLImageElement>) => {
          setStructure((prev) => ({ ...prev, isErrored: true, src: null }))
          onError?.(event)
        }}
        {...restProps}
      />
    </PictureMainContainer>
  )
}

type StyledPictureMain = {
  $ratio: NonUndefined<PictureMainProps["ratio"]>
  $rounded: NonUndefined<PictureMainProps["rounded"]>
  $isFallback: boolean
}

const PictureImage = css`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const PictureFallback = css`
  position: relative;
  width: 100%;
  color: rgb(var(--color-neutral800));
  overflow: hidden;
  background: rgb(var(--color-neutral300));
  span,
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transform: translate(-50%, -50%) scale(0.85);
  }
  svg {
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }
`

const PictureMainContainer = styled.div<StyledPictureMain>`
  /* size */
  ${(props) => {
    if (props.$ratio && !isEquals(props.$ratio, [0, 0]))
      return css`
        img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &:before {
          content: "";
          display: block;
          padding-top: ${(props.$ratio[1] / props.$ratio[0]) * 100}%;
        }
      `
    return css`
      img {
        position: relative;
        width: 100%;
        height: auto;
      }
      &:before {
        content: none;
      }
    `
  }}
  /* fallback */
  ${(props) => {
    switch (props.$isFallback) {
      case false:
        return PictureImage
      case true:
      default:
        return PictureFallback
    }
  }}
  /* rounded */
  ${(props) => {
    switch (props.$rounded) {
      case EnumPictureRounded.Full:
        return css`
          border-radius: ${props.$ratio && !isEquals(props.$ratio, [0, 0]) ? "50%" : "9999px"};
        `
      case EnumPictureRounded.None:
      default:
        return css`{
          border-radius: 0px;
        }`
    }
  }}
`

export default PictureMain
