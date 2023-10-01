export interface Portfolio {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
}

export interface AllPortfolios {
  total: number;
  data: Portfolio[];
}

export interface PortfolioState {
  getPortfolioIsLoading: boolean;
  getPortfolioIsSuccess: boolean;
  getPortfolioError: { hasError: boolean; description: string };
  portfolio: Portfolio | undefined;
  getAllPortfolioIsLoading: boolean;
  getAllPortfolioIsSuccess: boolean;
  getAllPortfolioError: { hasError: boolean; description: string };
  allPortfolios: AllPortfolios;
  addPortfolioIsLoading: boolean;
  addPortfolioIsSuccess: boolean;
  addPortfolioError: { hasError: boolean; description: string };
  updatePortfolioIsLoading: boolean;
  updatePortfolioIsSuccess: boolean;
  updatePortfolioError: { hasError: boolean; description: string };
  deletePortfolioIsLoading: boolean;
  deletePortfolioIsSuccess: boolean;
  deletePortfolioError: { hasError: boolean; description: string };
}
