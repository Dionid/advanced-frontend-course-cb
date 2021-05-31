import {ActiveFilters} from "../core/entities/search";

const URL_FILTERS_NAME = "activeFilters"

export class UrlService {
  public static translateUrlToSearchItemsEntity = (url: string): ActiveFilters | null => {
    if (!url) {
      return null
    }
    const searchParams = new URLSearchParams(url);
    const activeFiltersQuery = searchParams.get(URL_FILTERS_NAME)
    if (!activeFiltersQuery) {
      return null
    }
    return JSON.parse(activeFiltersQuery) as ActiveFilters
  }

  public static translateActiveFiltersToUrl = (filters: ActiveFilters): string => {
    return `?${URL_FILTERS_NAME}=${JSON.stringify(filters)}`
  }
}
