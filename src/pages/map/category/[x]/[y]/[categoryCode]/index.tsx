import { Fragment } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import useMap from "@/hooks/useMap"
import useMount from "@/hooks/useMount"
import { checkCategory } from "@/libs/map"
import { EnumCategoryCode } from "@/queries/map"
import useFetchCategory from "@/queries/map/useFetchCategory"
import Map from "@/components/layout/Map"
import { TypeGetCategory } from "@/components/form/GetCategory"
import Pagination from "@/components/navigation/Pagination"
import Link from "@/components/general/Link"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"
import Result from "@/components/display/Result"
import Category from "@/components/card/Category"

interface PageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  //
}

type TypeParams = {
  x: string
  y: string
  categoryCode: string
}

const Page = (props: PageProps) => {
  const {} = props

  const navigate = useNavigate()
  const { x, y, categoryCode } = useParams<TypeParams>()
  const { mapStructure, onCapture, onMove, onOverlay } = useMap()
  const {} = useMount(() => {
    if (!mapStructure.status?.isInitialized) return
    if (isNaN(Number(x)) || isNaN(Number(y))) return navigate("/map/category")
    if (!checkCategory(categoryCode).isValid) return navigate("/map/category")
    onMove({ level: 3, center: [Number(y), Number(x)] })
    onCapture((prev) => ({ ...prev, categoryCode: categoryCode as EnumCategoryCode }))
  }, [mapStructure.status?.isInitialized])

  const getCategory = useForm<TypeGetCategory>({
    defaultValues: {
      kidId: 1,
      size: 10,
      radius: 1,
      categoryCode: categoryCode as EnumCategoryCode,
      capture: {
        categoryCode: categoryCode as EnumCategoryCode,
      },
    },
  })

  const {
    data: categoryData,
    status: categoryStatus,
    fetchStatus: categoryFetchStatus,
    refetch,
  } = useFetchCategory(
    getCategory.watch("kidId"),
    {
      size: getCategory.watch("size"),
      radius: getCategory.watch("radius"),
      level: mapStructure.capture.location.level,
      center: [Number(y), Number(x)],
      categoryCode: getCategory.watch("categoryCode"),
    },
    {
      onSuccess: (data) => {
        document.querySelector("#LocationSheet")!.scrollTop = 0
        onOverlay(
          (data?.documents ?? [])?.map((document) => ({
            center: [Number(document.y), Number(document.x)],
            anchor: [0.48, 1],
            content: `<button type="button" class="marker marker-pin marker-active" data-navigate="/map/category/${document.x}/${document.y}/${document.category_group_code}">
              ${renderToStaticMarkup(<Icon name="EnvironmentFilled" />)}
              <span class="sr-only">${document.place_name}</span>
            </button>`,
          })),
        )
      },
      onError: () => {
        onOverlay([])
      },
    },
  )

  return (
    <PageContainer
      asTag="main"
      headlineEl={(props: Record<string, unknown>) => (
        <Map.Headline
          prefixEl={(props: Record<string, unknown>) => (
            <div {...props}>
              <Button
                asTag={Link}
                to="/map/category"
                shape="plain"
                size="base"
                variants="secondary"
                prefixEl={(props: Record<string, unknown>) => <Icon name="Left" label="주변정보" {...props} />}
              />
            </div>
          )}
          suffixEl={(props: Record<string, unknown>) => (
            <div {...props}>
              <Button asTag={Link} to="/map/analysis" shape="plain" size="sm" variants="primary">
                상권분석
              </Button>
              <Button
                type="button"
                shape="plain"
                size="base"
                variants="secondary"
                prefixEl={(props: Record<string, unknown>) => <Icon name="Search" label="검색" {...props} />}
              />
            </div>
          )}
          {...props}
        />
      )}
    >
      <PageResult asTag="section">
        {categoryStatus === "error" ? (
          <PageEmpty
            coreEl={(props: Record<string, unknown>) => <strong {...props}>잠시후 다시 시도해주세요</strong>}
            detailEl={(props: Record<string, unknown>) => (
              <p {...props}>
                {`요청을 처리하는 동안 문제가 발생했습니다.\n잠시 후 다시 시도하시거나\n페이지를 새로고침해 주세요.`}
              </p>
            )}
            actionEl={(props: Record<string, unknown>) => (
              <div {...props}>
                <Button type="button" shape="plain" onClick={refetch}>
                  다시시도
                </Button>
                <Button type="button" shape="plain" onClick={() => navigate(0)}>
                  새로고침
                </Button>
              </div>
            )}
          />
        ) : categoryStatus === "pending" ? (
          <Fragment>
            {categoryFetchStatus === "idle" ? (
              <PageEmpty
                coreEl={(props: Record<string, unknown>) => <strong {...props}>검색 범위가 초과되었어요</strong>}
                detailEl={(props: Record<string, unknown>) => <span {...props}>지도를 확대하여 확인해보세요</span>}
              />
            ) : (
              <PageList>
                <Category asTag={"li"} isSkeleton={true} />
              </PageList>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {!categoryData?.documents?.length ? (
              <PageEmpty
                coreEl={(props: Record<string, unknown>) => (
                  <strong {...props}>
                    {`검색된 "${checkCategory(getCategory.watch("categoryCode")).option?.text ?? "categoryCode"}" 정보가 없습니다`}
                  </strong>
                )}
                actionEl={(props: Record<string, unknown>) => (
                  <div {...props}>
                    <Button asTag={Link} to={`/map/category`} shape="plain">
                      주변정보 탐색
                    </Button>
                  </div>
                )}
              />
            ) : (
              <Fragment>
                <PageHeadline
                  coreEl={(props: Record<string, unknown>) => <strong {...props}>장소</strong>}
                  detailEl={(props: Record<string, unknown>) => (
                    <span {...props}>{categoryData?.meta?.total_count}</span>
                  )}
                />
                <PageList>
                  {categoryData?.documents?.map((document) => (
                    <Category
                      key={document.id}
                      asTag={"li"}
                      data={document}
                      actionEl={(props: Record<string, unknown>) => (
                        <div {...props}>
                          <Button asTag={Link} to={`/map/category`} shape="plain">
                            주변정보 탐색
                          </Button>
                        </div>
                      )}
                    />
                  ))}
                </PageList>
                {categoryData?.meta && (
                  <Fragment>
                    {categoryData?.meta?.total_count > categoryData?.meta?.pageable_count &&
                      categoryData?.meta?.pagination_count === getCategory.watch("kidId") && (
                        <PageEmpty
                          coreEl={(props: Record<string, unknown>) => (
                            <strong {...props}>
                              {`장소 정보는 최대 ${categoryData?.meta?.pageable_count}개까지 조회 가능해요`}
                            </strong>
                          )}
                          detailEl={(props: Record<string, unknown>) => (
                            <span {...props}>자세한 정보는 카카오 지도에서 확인해주세요</span>
                          )}
                        />
                      )}
                    <PagePagination
                      page={getCategory.watch("kidId")}
                      totalPages={categoryData?.meta?.pagination_count}
                      onPaging={(page) => getCategory.setValue("kidId", page)}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </PageResult>
    </PageContainer>
  )
}

const PageHeadline = styled(Result.Headline)`
  /*  */
`

const PageEmpty = styled(Result.Empty)`
  margin-top: 18px;
`

const PageList = styled.ul`
  margin-top: 10px;
  border-top: 1px solid rgb(var(--color-neutral400));
  border-bottom: 1px solid rgb(var(--color-neutral400));
  &:first-child {
    margin-top: 16px;
  }
  > li {
    padding: 12px 0;
  }
  > li + li {
    border-top: 1px solid rgb(var(--color-neutral400));
  }
`

const PagePagination = styled(Pagination)`
  margin-top: 16px;
`

const PageResult = styled(Result)`
  /*  */
`

const PageContainer = styled(Map.Page)`
  /*  */
`

export default Page
