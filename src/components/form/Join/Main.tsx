import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import styled from "styled-components"
import { TypeJoin } from "@/components/form/Join"
import { EnumJoinAuthorization } from "@/queries/auth"
import Button from "@/components/general/Button"

export interface JoinMainProps<T extends FieldValues = TypeJoin>
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  data: UseFormReturn<T>
  isLoading?: boolean
  isSuccess?: boolean
  onValid: SubmitHandler<T>
}

const JoinMain = (props: JoinMainProps) => {
  const { data, isLoading, onValid, ...restProps } = props

  const { handleSubmit, setValue } = data

  return (
    <JoinMainContainer id="join" noValidate onSubmit={handleSubmit(onValid)} {...restProps}>
      <JoinMainKakao
        type="submit"
        onClick={() => setValue("authorization", EnumJoinAuthorization.Kakao)}
        disabled={isLoading}
      >
        카카오 로그인
      </JoinMainKakao>
      <JoinMainNaver
        type="submit"
        onClick={() => setValue("authorization", EnumJoinAuthorization.Naver)}
        disabled={isLoading}
      >
        네이버 로그인
      </JoinMainNaver>
      <JoinMainGoogle
        type="submit"
        onClick={() => setValue("authorization", EnumJoinAuthorization.Google)}
        disabled={isLoading}
      >
        구글 로그인
      </JoinMainGoogle>
    </JoinMainContainer>
  )
}

const JoinMainKakao = styled(Button)`
  color: rgb(var(--color-neutral1100));
  background: rgb(var(--color-gold500));
  border-color: rgb(var(--color-gold500));
  &:not(:disabled):hover {
    color: rgb(var(--color-neutral1100));
    background: rgb(var(--color-gold400));
    border-color: rgb(var(--color-gold400));
  }
  &:not(:disabled):focus-visible {
    outline: 4px solid rgb(var(--color-gold200));
    outline-offset: 1px;
  }
  &:not(:disabled):active {
    color: rgb(var(--color-neutral1100));
    background: rgb(var(--color-gold600));
    border-color: rgb(var(--color-gold600));
  }
`

const JoinMainNaver = styled(Button)`
  color: rgb(var(--color-neutral100));
  background: rgb(var(--color-green600));
  border-color: rgb(var(--color-green600));
  &:not(:disabled):hover {
    color: rgb(var(--color-neutral100));
    background: rgb(var(--color-green500));
    border-color: rgb(var(--color-green500));
  }
  &:not(:disabled):focus-visible {
    outline: 4px solid rgb(var(--color-green300));
    outline-offset: 1px;
  }
  &:not(:disabled):active {
    color: rgb(var(--color-neutral100));
    background: rgb(var(--color-green700));
    border-color: rgb(var(--color-green700));
  }
`

const JoinMainGoogle = styled(Button)`
  /*  */
`

const JoinMainContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default JoinMain
