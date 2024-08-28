/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorVo {
  code: string;
  message: string;
  messageCode: string;
  eventName?: string;
}

export interface CommonCodeGroupQueryResponse {
  codeGroup: string;
  name: string;
  description: string | null;
  /** @format double */
  order: number | null;
}

export interface CommonResponseCommonCodeGroupQueryResponseArray {
  /** @format double */
  total?: number;
  data?: CommonCodeGroupQueryResponse[];
  error: ErrorVo;
}

export interface FindManyCodeGroupsQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  name?: string;
}

/**
 * Model CommonCode
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface CommonCode {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  /** @format double */
  order: number;
  description: string | null;
  name: string;
  codeGroup: string;
  code: string;
}

export interface CommonResponseCommonCodeArray {
  /** @format double */
  total?: number;
  data?: CommonCode[];
  error: ErrorVo;
}

export interface FindManyCodesQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  codeGroup?: string;
}

/**
 * Model AttachFile
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface AttachFile {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  /** @format double */
  fileSize: number | null;
  fileExt: string | null;
  fileChgName: string | null;
  fileName: string;
  fileUrl: string;
  path: string | null;
  attachFileId: string;
}

export interface CommonResponseAttachFile {
  /** @format double */
  total?: number;
  /**
   * Model AttachFile
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: AttachFile;
  error: ErrorVo;
}

export interface SendCertificationSMSResponse {
  /** 문자 전송 업체에서 반환하는 UUID */
  messageId: string;
  /**
   * 만료시간 epoch time
   * @format double
   */
  expiryTime: number;
}

export interface CommonResponseSendCertificationSMSResponse {
  /** @format double */
  total?: number;
  data?: SendCertificationSMSResponse;
  error: ErrorVo;
}

export interface SendCertificationSMSRequest {
  /**
   * 콘솔멤버 이름
   * @example "김개발"
   */
  consoleMemberName: string;
  /**
   * 국가번호
   * @example "82"
   */
  nationCodeNumber: string;
  /**
   * 핸드폰 번호
   * @example "01042128867"
   */
  phone: string;
}

export interface CommonResponse {
  /** @format double */
  total?: number;
  data?: any;
  error: ErrorVo;
}

export interface CertificateCodeRequest {
  /**
   * 핸드폰 인증 인증번호 6자리
   * @minLength 6
   * @maxLength 6
   */
  code: string;
}

/** Ping응답 */
export interface PingResponse {
  /** 메시지 */
  message: string;
}

/**
 * Model App
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface App {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  siteUrl: string | null;
  detailDescription: string | null;
  bannerUrl: string | null;
  promotionalText: string | null;
  cardUrl: string | null;
  blockChainId: string;
  iconUrl: string | null;
  name: string;
  /** @format double */
  appId: number;
}

export interface CommonResponseApp {
  /** @format double */
  total?: number;
  /**
   * Model App
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: App;
  error: ErrorVo;
}

export interface CreateAppRequest {
  /**
   * 앱 이름
   * @minLength 1
   * @maxLength 50
   * @example "appName"
   */
  name: string;
  /**
   * @pattern [^(?:/(?:\*{1,2}|\w+\*{0,2}))+/?$]
   * @example "https://example.com/example/exampleexample"
   */
  iconUrl: string;
  /**
   * 체인
   * @example "ETH"
   */
  blockChainId: string;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickCreateAppRequestExcludeKeysBlockChainId {
  /**
   * 앱 이름
   * @minLength 1
   * @maxLength 50
   * @example "appName"
   */
  name: string;
  /**
   * @pattern [^(?:/(?:\*{1,2}|\w+\*{0,2}))+/?$]
   * @example "https://example.com/example/exampleexample"
   */
  iconUrl: string;
}

/** Construct a type with the properties of T except for those in type K. */
export type OmitCreateAppRequestBlockChainId =
  PickCreateAppRequestExcludeKeysBlockChainId;

export type UpdateAppRequest = OmitCreateAppRequestBlockChainId;

export enum Platform {
  IOS = 'iOS',
  Android = 'Android',
  Steam = 'Steam',
  Window = 'Window',
  MacOS = 'macOS',
}

export interface PlatformUrl {
  platform: Platform;
  url: string;
}

export enum ReleaseStatusCodeType {
  IN_REVIEW = 'IN_REVIEW',
  REQUESTED = 'REQUESTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  RELEASED = 'RELEASED',
}

export type ReleaseStatusCodeResponseType =
  | ReleaseStatusCodeType
  | 'Preparation'
  | (ReleaseStatusCodeType & 'Preparation');

export interface AppDetailResponseType {
  /** @format double */
  appId: number;
  name: string;
  iconUrl: string | null;
  blockChainId: string;
  cardUrl: string | null;
  promotionalText: string | null;
  bannerUrl: string | null;
  screenUrls: string[];
  detailDescription: string | null;
  siteUrl: string | null;
  platformUrls?: PlatformUrl[];
  languages?: string[];
  /** @format double */
  createdId: number;
  /** @format date-time */
  createdAt: string;
  /** 심사상태코드. 코드그룹(APRV_STAT), REQUEST: 심사요청, IN_REVIEW: 심사중, REJECTED: 반려, RELEASED: 출시, CANCELED: 취소됨 */
  status: ReleaseStatusCodeResponseType;
}

export interface CommonResponseAppDetailResponseType {
  /** @format double */
  total?: number;
  data?: AppDetailResponseType;
  error: ErrorVo;
}

export interface FindManyAppsQueryResponse {
  /**
   * 앱 id
   * @format double
   */
  appId: number;
  /** 앱 이름 */
  name: string;
  /** 앱 아이콘 url */
  iconUrl: string | null;
  /** 앱 하위 워크 스페이스 목록 */
  appWorkspace: {
    /** 디폴트 워크스페이스 여부 */
    defaultYn: string;
    /**
     * 워크스페이스 id
     * @format double
     */
    workspaceId: number;
  }[];
  appWallet: any;
}

export interface CommonResponseFindManyAppsQueryResponseArray {
  /** @format double */
  total?: number;
  data?: FindManyAppsQueryResponse[];
  error: ErrorVo;
}

export interface FindMAnyAppsQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** 앱 이름 검색 값 (포함 검색) */
  name?: string;
}

/**
 * Model AppApiKey
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface AppApiKey {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  key: string;
  /** @format date-time */
  expireDt: string;
  apiKeyKindCd: string;
  name: string;
  /** @format double */
  appId: number;
  /** @format double */
  apiKeyId: number;
}

export interface CommonResponseAppApiKey {
  /** @format double */
  total?: number;
  /**
   * Model AppApiKey
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: AppApiKey;
  error: ErrorVo;
}

export interface CreateAppApiKeyRequest {
  /**
   * 앱 식별자
   * @format int32
   * @example 1
   */
  appId: number;
  /**
   * 앱 API KEY 이름
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * 코드그룹명 : [API_KEY]
   * 키유형코드 =>
   * SIGN_SECRET: 서명 시크릿
   * REST_API: REST API 키
   * OAUTH2_CLIENT: oauth2클라이언트
   * ENC_PUBLIC: 암호화 공개키
   * ENC_PRIVATE: 암호화 비공개키
   * CLIENT_ID : 클라이언트 ID
   * CLIENT_SECRET : 클라이언트 시크릿
   * @example "REST_API"
   */
  apiKeyKindCode: string;
}

export interface CommonResponseAppApiKeyArray {
  /** @format double */
  total?: number;
  data?: AppApiKey[];
  error: ErrorVo;
}

export interface BigNumber {
  type: string;
  hex: string;
}

export interface AppWalletBalance {
  symbol: string;
  name: string;
  /** @format double */
  decimals: number;
  value: BigNumber;
  displayValue: string;
  iconUrl: string;
  contractAddress: string;
}

export interface CommonResponseAppWalletBalanceArray {
  /** @format double */
  total?: number;
  data?: AppWalletBalance[];
  error: ErrorVo;
}

export enum SupportChainId {
  Value137 = 137,
  Value80001 = 80001,
  Value56 = 56,
  Value97 = 97,
}

export interface BlockChainResponseType {
  /**
   * 블록체인 ID(심볼)
   * @example "BTC"
   */
  blockchainId: string;
  /**
   * 블록 체인 명
   * @example "BitCoin"
   */
  name: string;
  /** 심볼 이미지 URL */
  symbolImageUrl: string;
}

export interface CommonResponseBlockChainResponseTypeArray {
  /** @format double */
  total?: number;
  data?: BlockChainResponseType[];
  error: ErrorVo;
}

/**
 * Model Board
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface Board {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string | null;
  /** @format double */
  updatorId: number | null;
  /** @format double */
  creatorId: number;
  boardCd: string | null;
  content: string | null;
  title: string | null;
  /** @format double */
  id: number;
}

export interface CommonResponseBoardOrNull {
  /** @format double */
  total?: number;
  data?: Board | null;
  error: ErrorVo;
}

export interface CommonResponseBoardArray {
  /** @format double */
  total?: number;
  data?: Board[];
  error: ErrorVo;
}

export interface CommonResponseBoard {
  /** @format double */
  total?: number;
  /**
   * Model Board
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: Board;
  error: ErrorVo;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickBoardTitleOrContentOrCreatorId {
  title: string | null;
  content: string | null;
  /** @format double */
  creatorId: number;
}

/**
 * 게시판 글 생성 body
 * swagger 샘플은 아래와 같이 작성합니다. --- 현재 작동 안함
 * @example {"title":"제목 샘플a","content":"내용 샘플"}
 */
export type BoardCreateParams = PickBoardTitleOrContentOrCreatorId;

/** 게시판 글 삭제 body */
export interface BoardDeleteParams {
  boardIds: number[];
}

/**
 * Model ConsoleMember
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface ConsoleMember {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  recoveryEmail: string | null;
  phoneCertificateYn: string | null;
  phone: string | null;
  email: string;
  nickname: string;
  name: string;
  loginId: string;
  platformMemberId: string;
  memberId: string;
}

export interface CommonResponseConsoleMember {
  /** @format double */
  total?: number;
  /**
   * Model ConsoleMember
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: ConsoleMember;
  error: ErrorVo;
}

export interface CreateConsoleMemberRequest {
  /**
   * @minLength 8
   * @example "test1234"
   */
  loginId: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 닉네임
   * @example "지트북"
   */
  nickname: string;
  /**
   * 이메일 주소
   * @example "test@gmail.com"
   */
  email: string;
  /** 핸드폰 번호 */
  phone?: string;
  /** 모바일 인증 여부 */
  phoneCertificateYn?: string;
  /** 복구 이메일 */
  recoveryEmail?: string;
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickCreateConsoleMemberRequestExcludeKeysLoginIdOrPlatformMemberId {
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 닉네임
   * @example "지트북"
   */
  nickname: string;
  /**
   * 이메일 주소
   * @example "test@gmail.com"
   */
  email: string;
  /** 핸드폰 번호 */
  phone?: string;
  /** 모바일 인증 여부 */
  phoneCertificateYn?: string;
  /** 복구 이메일 */
  recoveryEmail?: string;
}

/** Construct a type with the properties of T except for those in type K. */
export type OmitCreateConsoleMemberRequestLoginIdOrPlatformMemberId =
  PickCreateConsoleMemberRequestExcludeKeysLoginIdOrPlatformMemberId;

export type UpdateConsoleMemberRequest =
  OmitCreateConsoleMemberRequestLoginIdOrPlatformMemberId;

export interface CommonResponseConsoleMemberArray {
  /** @format double */
  total?: number;
  data?: ConsoleMember[];
  error: ErrorVo;
}

export interface FindManyConsoleMembersQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  nickName?: string;
  email?: string;
}

export interface DirectListingResponse {
  /**
   * direct listing id
   * @example "3"
   */
  listingId: string;
  /**
   * transaction hash
   * @example "0x426eb17979ade27411a8209ff65305c14e892268bc66a074017ddd4a9c3f7d7e"
   */
  txHash: string;
  /** rawdata from rpc result including receipt, logs, event */
  rowData: any;
}

export interface CommonResponseDirectListingResponse {
  /** @format double */
  total?: number;
  data?: DirectListingResponse;
  error: ErrorVo;
}

export interface DirectListingRequest {
  /**
   * NFT Marketplace Contract address
   * @example "0xFae161C36B409651C60F22043355935e4Af30116"
   */
  contractAddress?: string;
  /**
   * Required - token ID of the NFT to sell
   * @example 8
   */
  tokenId: string;
  /**
   * Required - price of each token in the listing
   * @example "1.0"
   */
  pricePerToken: string;
  /**
   * Optional - smart contract address of the currency to use for the listing
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  currencyContractAddress?: string;
  /**
   * Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
   * @example false
   */
  isReservedListing?: boolean;
  /**
   * Optional - number of tokens to sell (1 for ERC721 NFTs)
   * @example 5
   */
  quantity?: string;
  /**
   * Optional - when the listing should start (default is now)
   * @example "2023-08-11 00:00:00"
   */
  startTimestamp?: string;
  /**
   * Optional - when the listing should end (default is 7 days from now)
   * @example "2023-08-18 00:00:00"
   */
  endTimestamp?: string;
}

export interface CommonResponseAny {
  /** @format double */
  total?: number;
  data?: any;
  error: ErrorVo;
}

export interface CancelListingRequest {
  tokenId: string;
  /** @format double */
  appId: number;
}

export interface ChangePriceRequest {
  /** @format double */
  appId: number;
  price: string;
  tokenId: string;
}

export interface PaginatorQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
}

export interface NFTList {
  /**
   * 금액 (거래통화 기준)
   * @example "0.1"
   */
  price: string;
  /**
   * 거래 통화 ( MATIC, ETH, ETC )
   * @example "MATIC"
   */
  currency: string;
  /**
   * 마켓 리스팅 아이디 (구매 시 사용)
   * @example 1
   */
  listingId: string;
  /**
   * NFT Token ID
   * @example 1
   */
  tokenId: string;
  /**
   * 남은 수량
   * @example 1
   */
  availableQuantity: string;
  /**
   * NFT 이미지 주소 화면 표시용 (게이트웨이 URL)
   * @example "https://4e84146aac674979bab7cb5193b5a409.ipfscdn.io/ipfs/bafybeid4i2telk234fmm44twdniajsgmojm2ledpu4c6n7e2qmqsmffr5y/do2g.jpg"
   */
  nftImageUrl: string;
  /**
   * NFT IPFS 이미지 주소
   * @example "ipfs://QmQnkn9WJCf8vz4sKtjv79pmcCqyc931EPw4Fva9uDsMm2/0"
   */
  ipfsUrl: string;
  /**
   * NFT 명 (상품명)
   * @example "10000 Point"
   */
  nftName: string;
  /**
   * NFT 설명명 (상품설명)
   * @example "10000 Point you can get"
   */
  nftDescription: string;
  /**
   * Listing StartTime Seconds
   * @format double
   */
  createdAt: number;
}

export interface CurrencyValue {
  value: string;
  displayValue: string;
}

export interface Trait {
  trait_type: string;
  value: any;
  display_type?: string;
}

export interface TraitWithBoost {
  trait_type: string;
  value: any;
  display_type: 'boost_number' | 'boost_percentage';
}

export interface TraitWithLevel {
  trait_type: string;
  value: any;
  display_type: 'number';
}

export interface Metadata {
  /**
   * The name of NFT.
   * @example "Tier 1 Pomerium"
   */
  name: string;
  /**
   * Optional description for the NFT.
   * @example "A majestic creature from the enchanted forest."
   */
  description?: string;
  /**
   * ipfs url
   * @example "ipfs://QmXyzAbCdEf12345/0"
   */
  image: string;
  /** Additional attributes for the NFT, including traits, boosts, or levels. */
  attributes?: (
    | Trait
    | TraitWithBoost
    | TraitWithLevel
    | (Trait & TraitWithBoost & TraitWithLevel)
  )[];
  /** Additional properties for the NFT, including traits, boosts, or levels. */
  properties?: (
    | Trait
    | TraitWithBoost
    | TraitWithLevel
    | (Trait & TraitWithBoost & TraitWithLevel)
  )[];
  /**
   * External URL for more information about the NFT.
   * @example "https://example.com/nft-details"
   */
  external_url?: string;
  /**
   * Background color for the NFT display.
   * @example "#ffcc00"
   */
  background_color?: string;
  /**
   * tokenID - The unique identifier of the NFT.
   * @example "123456"
   */
  id?: string;
  /**
   * The URI of the NFT.
   * @example "ipfs://QmXyzAbCdEf12345"
   */
  uri?: string;
  /**
   * Custom image URL for the NFT.
   * @example "https://example.com/custom-nft-image.jpg"
   */
  customImage?: string;
  /**
   * Custom animation URL for the NFT.
   * @example "https://example.com/custom-nft-animation.gif"
   */
  customAnimationUrl?: string;
}

export enum Status {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
}

export interface ListingNFT {
  /**
   * The id of the listing.
   * @example 1
   */
  id: string;
  /**
   * The address of the creator of listing.
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  creatorAddress: string;
  /** The address of the asset being listed. */
  assetContractAddress: string;
  /**
   * The ID of the token to list.
   * @example "1"
   */
  tokenId: string;
  /** The quantity of tokens to include in the listing (always 1 for ERC721). */
  quantity: string;
  /**
   * The address of the currency to accept for the listing.
   * @example "0x4c1A52719d507827F8A3353bD0Aaf85BCc5Ce9a9"
   */
  currencyContractAddress: string;
  /** The `CurrencyValue` of the listing. Useful for displaying the price information. */
  currencyValuePerToken: CurrencyValue;
  /**
   * The price to pay per unit of NFTs listed. ( MATIC for this project )
   * @example "0.1"
   */
  pricePerToken: string;
  /** The asset being listed. */
  asset: Metadata;
  /**
   * The start time of the listing.
   * @format double
   */
  startTimeInSeconds: number;
  /**
   * The end time of the listing.
   * @format double
   */
  endTimeInSeconds: number;
  /**
   * Whether the listing is reserved to be bought from a specific set of buyers.
   * @example false
   */
  isReservedListing: boolean;
  /**
   * Whether the listing is CREATED, COMPLETED, or CANCELLED.
   * UNSET = 0, Created = 1, Completed = 2, Cancelled = 3, Active = 4, Expired = 5
   * @example 4
   */
  status: Status;
}

export interface ListingResponse {
  list: NFTList[];
  rowData: ListingNFT[];
}

export interface CommonResponseListingResponse {
  /** @format double */
  total?: number;
  data?: ListingResponse;
  error: ErrorVo;
}

export interface GetValidListingsQueryParams {
  includeRowData: boolean;
  /** @format double */
  pageSize?: number;
  /** @format double */
  pageNo?: number;
  sellerAddress?: string;
  tokenContract?: string;
  tokenId?: string;
}

export interface IpfsResponse {
  /**
   * IPFS URL
   * @example "ipfs://QmcbeKNja2q82GYDSsJyJiPvC7BBbrNi6vL3X6KTUee66M/dog.jpg"
   */
  ipfsUrl: string;
  /**
   * IMAGE URL - GATEWAY URL + 파일명
   * @example "https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafybeigt3lrm5frjsocxmrjkmecu55ky3t4bpqe3shbgktk7knxuexgwmi/dog.jpg"
   */
  imageUrl: string;
}

export interface CommonResponseIpfsResponse {
  /** @format double */
  total?: number;
  data?: IpfsResponse;
  error: ErrorVo;
}

export interface MetadataWithSupply {
  /**
   * The amount to be minted.
   * @example 1
   */
  supply: string;
  metadata: Metadata;
  imageUrl?: string;
}

export interface MintBatchRequest {
  /** @format double */
  appId?: number;
  /** 마켓플레이스 즉시 등록 여부 */
  listing: boolean;
  /**
   * 마켓플레이스 판매 가격
   * @example "10.00"
   */
  price: string;
  /**
   * NFT Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress?: string;
  metadatas: MetadataWithSupply[];
}

export type MintBatchToRequest = MintBatchRequest;

export interface MintAdditionalSupplyRequest {
  /**
   * NFT Contract address
   * @example "0x34e0f7185f99d874fCC12400db9fA79778958224"
   */
  contractAddress: string;
  /**
   * NFT token id
   * @format double
   * @example 1
   */
  tokenId: number;
  /** @format double */
  additionalSupply: number;
}

export interface NftItemDataType {
  /** @format double */
  id: number;
  imgSrc?: null;
  nftName?: null;
  sales: boolean;
  price: string;
  symbol: string;
  total?: null;
  rest?: null;
  type: string;
}

export interface CommonResponseNftItemDataTypeArray {
  /** @format double */
  total?: number;
  data?: NftItemDataType[];
  error: ErrorVo;
}

export interface NftItemDetailDataType {
  /** @format double */
  id: number;
  imgSrc?: null;
  nftName?: null;
  sales: boolean;
  price: string;
  symbol: string;
  total?: null;
  rest?: null;
  type: string;
  description?: string | null;
  contractAddress?: string;
  properties?: {
    value: string;
    type: string;
  }[];
  /** @format double */
  createdAt?: number;
}

export interface CommonResponseNftItemDetailDataType {
  /** @format double */
  total?: number;
  data?: NftItemDetailDataType;
  error: ErrorVo;
}

export interface GetNFTQueryParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  /**
   * The format of the token ID
   * @example "decimal"
   */
  format?: 'decimal' | 'hex';
  /**
   * Should normalized metadata be returned?
   * @example false
   */
  normalizeMetadata?: boolean;
  /**
   * Should preview media data be returned?
   * @example false
   */
  mediaItems?: boolean;
}

export interface NFTOwnersDataType {
  tokenId: string;
  tokenAddress: string;
  ownerAddress: string;
  amount: string;
  blockNumber: string;
}

export interface NFTOwnersResponseType {
  /** @format double */
  page: number;
  /** @format double */
  page_size: number;
  cursor: string | null;
  result: NFTOwnersDataType[];
  hasNext?: boolean;
}

export interface CommonResponseNFTOwnersResponseType {
  /** @format double */
  total?: number;
  data?: NFTOwnersResponseType;
  error: ErrorVo;
}

export interface NFTTransactionDataType {
  tokenId: string;
  amount: string;
  fromAddress: string;
  toAddress: string;
  tokenAddress: string;
  blockNumber: string;
  blockTimeStamp: string;
  txId: string;
}

export interface NFTTransactionResponseType {
  /** @format double */
  page: number;
  /** @format double */
  page_size: number;
  cursor: string | null;
  result: NFTTransactionDataType[];
  hasNext?: boolean;
}

export interface CommonResponseNFTTransactionResponseType {
  /** @format double */
  total?: number;
  data?: NFTTransactionResponseType;
  error: ErrorVo;
}

export interface GetNFTTransactionsByTokenIdQueryParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
}

export enum LanguageOptions {
  Ko = 'ko',
  En = 'en',
  Cn = 'cn',
  Jp = 'jp',
}

export interface ApplyReleaseRequest {
  /**
   * 앱 id
   * @format double
   * @example 1
   */
  appId: number;
  /**
   * 소개글
   * @example "소개글"
   */
  promotionalText: string;
  /**
   * 배너 이미지 url
   * @example "http://example.image/banner"
   */
  bannerUrl: string;
  /**
   * 카드 이미지 url
   * @example "http://example.image/card"
   */
  cardUrl: string;
  /**
   * 스크린샷 이미지 url 목록
   * @example ["http://example.image/screenshot1","http://example.image/screenshot2"]
   */
  screenUrls: string[];
  /**
   * 상세 설명
   * @example "상세설명"
   */
  detailDescription: string;
  /**
   * 홈페이지 주소
   * @example "http://example.homepage.com"
   */
  siteUrl: string;
  /**
   * 플랫폼 링크
   * 플랫폼 종류 : "iOS" , "Android" , "Steam" , "Window", "macOS"
   */
  platformUrls: PlatformUrl[];
  /** 지원 언어 "ko" , "en" , "cn" , "jp" */
  selectedLanguages: LanguageOptions[];
}

export interface FindManyReleaseHistoryResponse {
  /**
   * 출시 히스토리 id
   * @format double
   */
  id: number;
  /**
   * 앱 id
   * @format double
   */
  appId: number;
  /** 출시 심사 id */
  reviewId: string;
  /** 심사상태코드. 코드그룹(APRV_STAT), REQUEST: 심사요청, IN_REVIEW: 심사중, REJECTED: 반려, RELEASED: 출시, CANCELED: 취소됨 */
  statusCd: string;
  /**
   * 작성자 id
   * @format double
   */
  createdId: number;
  /**
   * 작성일
   * @format date-time
   */
  createdAt: string;
}

export interface CommonResponseFindManyReleaseHistoryResponseArray {
  /** @format double */
  total?: number;
  data?: FindManyReleaseHistoryResponse[];
  error: ErrorVo;
}

export interface GasCost {
  ether: string;
  wei: BigNumber;
}

export interface SimulateTxResponse {
  gasCost: GasCost;
  gasLimit: BigNumber;
}

export interface CommonResponseSimulateTxResponse {
  /** @format double */
  total?: number;
  data?: SimulateTxResponse;
  error: ErrorVo;
}

export interface TokenTransferRequest {
  /** @format double */
  appId?: number;
  /** @format double */
  walletId: number;
  symbol: string;
  toAddress: string;
  /** @format double */
  amount: number;
  chainId: SupportChainId;
}

export interface TransferNativeResponse {
  /**
   * sender's wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  fromAddress?: string;
  /**
   * recipient wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  toAddress?: string;
  /**
   * amount of native token
   * @format double
   * @example 1
   */
  amount: number;
  /**
   * transaction hash
   * @example "0x426eb17979ade27411a8209ff65305c14e892268bc66a074017ddd4a9c3f7d7e"
   */
  txHash: string;
  /** rawdata from rpc result including receipt, logs, event */
  rowData: any;
}

export type TransferTokenResponse = TransferNativeResponse;

export interface CommonResponseTransferTokenResponse {
  /** @format double */
  total?: number;
  data?: TransferTokenResponse;
  error: ErrorVo;
}

export interface TransferTokenRequest {
  /**
   * recipient wallet address
   * @example "0xBcb0a748ea81B17274De6714ea60BD56E76E11cb"
   */
  toAddress: string;
  /**
   * amount of native token
   * @format double
   * @example 1
   */
  amount: number;
  /** @format double */
  appId?: number;
  /**
   * Include the smart contract address of the token you want to transfer
   * @example "0x507f60A808C4e69E4Af0395F9265C7F89CE03D04"
   */
  tokenContractAddress: string;
  /**
   * private key
   * @example ""
   */
  privateKey: string;
}

export interface FindWalletByAppIdQueryResponse {
  /**
   * 앱 id
   * @format double
   */
  appId: number;
  /** 콘솔 지갑 id */
  walletId: string;
  /** 콘솔 지갑 주소 */
  address: string;
  /** 암호화 프라이빗키 */
  encPrivateKey: string;
  /** 자동 서명 여부 */
  autoSignYn: 'Y' | 'N';
  /**
   * 보유 토큰 수량
   * @format double
   */
  tokenCount: number;
  /** 보유 PMG(기준 재화 토큰) 토큰 수량 */
  PMG_balance: string;
  /** 지갑 설정 멤버 접근 허용 여부 */
  memberAccessYn: 'Y' | 'N';
  /**
   * 앱 생성자 id
   * @format double
   */
  createdId: number;
  /**
   * 콘솔 지갑 생성일
   * @format date-time
   */
  createdAt: string;
}

export interface CommonResponseFindWalletByAppIdQueryResponse {
  /** @format double */
  total?: number;
  data?: FindWalletByAppIdQueryResponse;
  error: ErrorVo;
}

export interface WalletTransactionDataType {
  txId: string;
  nonce: string;
  blockNumber: string;
  receiptStatus: string;
  fromAddress: string;
  toAddress: string;
  value: string;
  gas?: string | null;
  gasPrice: string;
  blockTimestamp: string;
}

export interface WalletTransactionsResponseType {
  /** @format double */
  page: number;
  /** @format double */
  page_size: number;
  cursor: string | null;
  result: WalletTransactionDataType[];
  hasNext?: boolean;
}

export interface CommonResponseWalletTransactionsResponseType {
  /** @format double */
  total?: number;
  data?: WalletTransactionsResponseType;
  error: ErrorVo;
}

export interface GetTransactionsQueryParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
}

/**
 * Model Webhook
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface Webhook {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  requireYn: string;
  /** @format double */
  retryCount: number;
  webhookKindCd: string;
  name: string;
  /** @format double */
  webhookId: number;
}

export interface CommonResponseWebhook {
  /** @format double */
  total?: number;
  /**
   * Model Webhook
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: Webhook;
  error: ErrorVo;
}

export interface CreateWebhookRequest {
  /** 웹훅명 */
  name: string;
  /**
   * 웹훅 분류 코드
   * 코드그룹 : APS_WHK
   * 코드 : SWAP(게임재화 스왑) , TOKEN_IN(토큰 입금) , NFT_MINT(NFT 생성) , REVIEW_RESULT(심사결과 전송)
   */
  webhookKindCode: string;
  /** 필수 여부 Y/N */
  requireYn: string;
  /**
   * 로그인한 회원 id
   * @format double
   */
  userId: number;
}

export interface CommonResponseWebhookArray {
  /** @format double */
  total?: number;
  data?: Webhook[];
  error: ErrorVo;
}

/**
 * Model AppWebhook
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface AppWebhook {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  encryptionYn: string;
  endpointUrl: string;
  name: string;
  profile: string;
  /** @format double */
  appId: number;
  /** @format double */
  webhookId: number;
}

export interface CommonResponseAppWebhook {
  /** @format double */
  total?: number;
  /**
   * Model AppWebhook
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: AppWebhook;
  error: ErrorVo;
}

export interface CreateAppWebhookRequest {
  /**
   * 앱id
   * @format double
   */
  appId: number;
  /** 프로필 : DEV(개발환경,테스트) , PRD(운영) */
  profile: string;
  /**
   * 웹훅명
   * @minLength 1
   * @maxLength 20
   */
  name: string;
  /** 구간암호화 여부 Y/N */
  encryptionYn: string;
  /** 엔드포인트 URL */
  endpointUrl: string;
  /**
   * 웹훅 id
   * @format double
   */
  webhookId: number;
}

export type UpdateAppWebhookRequest = CreateAppWebhookRequest;

export interface CommonResponseAppWebhookArray {
  /** @format double */
  total?: number;
  data?: AppWebhook[];
  error: ErrorVo;
}

export interface FindManyAppWebhooksQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** 'DEV' | 'PRD' */
  profile?: 'DEV' | 'PRD';
}

export interface DeleteAppWebhookRequest {
  /** @format double */
  appId: number;
  profile: 'DEV' | 'PRD';
  /** @format double */
  webhookId: number;
}

export interface AppWebhookLogsQueryResponse {
  /** 웹훅 로그 번호 */
  no: string;
  /** 프로필 : DEV | PRD */
  profile: string;
  /**
   * 웹훅 분류 코드
   * 코드그룹 : APS_WHK
   * 코드 : SWAP(게임재화 스왑) , TOKEN_IN(토큰 입금) , NFT_MINT(NFT 생성) , REVIEW_RESULT(심사결과 전송)
   */
  webhookKindCode: string;
  /** 웹훅 이름 */
  webhookName: string;
  /** 엔드포인트 URL */
  url: string;
  /** 날짜 */
  date: string;
  /** 처리 상태 */
  status: string;
  /** 요청 BODY */
  requestBody: string;
  /** 응답 BODY */
  responseBody: string;
}

export interface CommonResponseAppWebhookLogsQueryResponseArray {
  /** @format double */
  total?: number;
  data?: AppWebhookLogsQueryResponse[];
  error: ErrorVo;
}

export interface FindManyAppWebhookLogsQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** YYYY-MM-DD */
  from?: string;
  /** YYYY-MM-DD */
  to?: string;
  /** 'DEV' | 'PRD' */
  profile?: 'DEV' | 'PRD';
  /** 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT' */
  webhookKindCd?: 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT';
  /** 'Success'|'Fail' */
  logStatus?: 'Success' | 'Fail';
}

/**
 * Model AppWebhookLog
 * This table is a partition table and requires additional setup for migrations. Visit https://pris.ly/d/partition-tables for more info.
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface AppWebhookLog {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  responseBody: string | null;
  responseCd: string | null;
  requestBody: string | null;
  /** @format double */
  retriedCount: number;
  status: string;
  url: string;
  webhookKindNm: string;
  webhookKindCd: string;
  profile: string;
  /** @format double */
  webhookId: number;
  /** @format double */
  appId: number;
  /** @format date-time */
  processDt: string;
  no: string;
}

export interface CommonResponseAppWebhookLog {
  /** @format double */
  total?: number;
  /**
   * Model AppWebhookLog
   * This table is a partition table and requires additional setup for migrations. Visit https://pris.ly/d/partition-tables for more info.
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: AppWebhookLog;
  error: ErrorVo;
}

export interface ResendAppWebhookRequest {
  /** @format double */
  no: number;
  processDt: string;
}

/**
 * Model Workspace
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface Workspace {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  name: string;
  /** @format double */
  workspaceId: number;
}

export interface CommonResponseWorkspace {
  /** @format double */
  total?: number;
  /**
   * Model Workspace
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: Workspace;
  error: ErrorVo;
}

export interface CreateWorkspaceRequest {
  /** 워크스페이스 이름 */
  name: string;
  /**
   * 앱 id
   * @format double
   */
  appId: number;
}

export interface UpdateWorkspaceRequest {
  /** 변경할 워크스페이스 이름 */
  name: string;
}

export interface FindManyWorkspacesResponse {
  /**
   * 워크스페이스 id
   * @format double
   */
  workspaceId: number;
  name: string;
  /** 디폴트 워크스페이스 여부 */
  isDefault: boolean;
}

export interface CommonResponseFindManyWorkspacesResponseArray {
  /** @format double */
  total?: number;
  data?: FindManyWorkspacesResponse[];
  error: ErrorVo;
}

export interface FindMAnyWorkspacesQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** @format double */
  appId: number;
}

export interface FindManyWorkspaceMembersResponse {
  /** 회원 식별자 */
  consoleMemberId: string;
  /** 닉네임 */
  nickName: string;
  /** 로그인 아이디 */
  loginId: string;
  /**
   * 권한코드
   * 코드그룹: ACC_AUTH,
   * MASTER: 마스터,
   * NORMAL: 일반
   * @example "NORMAL"
   */
  authorityCode: string;
}

export interface CommonResponseFindManyWorkspaceMembersResponseArray {
  /** @format double */
  total?: number;
  data?: FindManyWorkspaceMembersResponse[];
  error: ErrorVo;
}

export interface FindMAnyWorkspaceMembersQueryParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** @format double */
  appId: number;
}

/**
 * Model WorkspaceMember
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface WorkspaceMember {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  alarmYn: string;
  authCd: string;
  /** @format double */
  workspaceId: number;
  memberId: string;
  workspaceMemberId: string;
}

export interface CommonResponseWorkspaceMember {
  /** @format double */
  total?: number;
  /**
   * Model WorkspaceMember
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: WorkspaceMember;
  error: ErrorVo;
}

export interface CreateWorkspaceMemberRequest {
  /**
   * 워크 스페이스 id
   * @format double
   * @example 1
   */
  workspaceId: number;
  /**
   * 초대할 회원 id
   * @format double
   * @example 1
   */
  memberId: number;
  /**
   * 권한코드. 코드그룹: ACC_AUTH
   * MASTER: 마스터,
   * NORMAL: 일반
   * @default ""NORMAL""
   * @example "NORMAL"
   */
  authorityCode: 'MASTER' | 'NORMAL';
}

export type UpdateWorkspaceMemberRequest = CreateWorkspaceMemberRequest;

export interface DeleteWorkspaceMemberRequest {
  /**
   * 워크스페이스 id
   * @format double
   */
  workspaceId: number;
  /**
   * 회원 id
   * @format double
   */
  memberId: number;
}

export interface InviteWorkspaceMemberRequest {
  /**
   * 워크스페이스 id
   * @format double
   * @example 1
   */
  workspaceId: number;
  /**
   * 이메일 주소
   * @example "test@naver.com"
   */
  email: string;
  /**
   * 권한코드
   * 코드그룹: ACC_AUTH,
   * MASTER: 마스터,
   * NORMAL: 일반
   * @example "NORMAL"
   */
  authorityCode: string;
}

/**
 * Model WorkspaceInvitation
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export interface WorkspaceInvitation {
  /** @format date-time */
  updatedAt: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format double */
  updatedId: number | null;
  /** @format double */
  createdId: number;
  /** @format date-time */
  acceptDt: string | null;
  /** @format date-time */
  inviteDt: string | null;
  email: string | null;
  statusCd: string;
  receiverMemberId: string | null;
  senderMemberId: string;
  /** @format double */
  workspaceId: number;
  /** @format double */
  invitationId: number;
}

export interface CommonResponseWorkspaceInvitation {
  /** @format double */
  total?: number;
  /**
   * Model WorkspaceInvitation
   * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
   */
  data?: WorkspaceInvitation;
  error: ErrorVo;
}

export interface UpdateInvitationRequest {
  /**
   * 변경 할 상태 값
   * 코드그룹: ACINV_STAT
   * P: pending,
   * A: accept,
   * R: reject,
   * C: account created
   * @example "A"
   */
  statusCode: string;
}

export interface FindManyCodeGroupsParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  name?: string;
}

export interface FindManyCodesParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  codeGroup?: string;
}

export interface FindManyAppsParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** 앱 이름 검색 값 (포함 검색) */
  name?: string;
}

export interface FindManyConsoleMembersParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  nickName?: string;
  email?: string;
}

export interface CreateDirectListingParams {
  /** @default false */
  includeRawData?: boolean;
  /** 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet */
  chainId: SupportChainId;
  /** @format double */
  appId: number;
}

export interface FindManyTokenActivitiesParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  chainId: SupportChainId;
  tokenId: string;
}

export interface GetValidListingsParams {
  includeRowData: boolean;
  /** @format double */
  pageSize?: number;
  /** @format double */
  pageNo?: number;
  sellerAddress?: string;
  tokenContract?: string;
  tokenId?: string;
  /** - 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet */
  chainId: SupportChainId;
}

export interface GetNftOwnersParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  /**
   * The format of the token ID
   * @example "decimal"
   */
  format?: 'decimal' | 'hex';
  /**
   * Should normalized metadata be returned?
   * @example false
   */
  normalizeMetadata?: boolean;
  /**
   * Should preview media data be returned?
   * @example false
   */
  mediaItems?: boolean;
  /** 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet */
  chainId: SupportChainId;
  contractAddress: string;
}

export interface GetNftOwnersByTokenIdParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  /**
   * The format of the token ID
   * @example "decimal"
   */
  format?: 'decimal' | 'hex';
  /**
   * Should normalized metadata be returned?
   * @example false
   */
  normalizeMetadata?: boolean;
  /**
   * Should preview media data be returned?
   * @example false
   */
  mediaItems?: boolean;
  chainId: SupportChainId;
  contractAddress: string;
  tokenId: string;
}

export interface GetNftTransactionsByTokenIdParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  chainId: SupportChainId;
  contractAddress: string;
  tokenId: string;
}

export interface GetReleaseHistoriesParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** @format double */
  appId: number;
}

export interface TransferTokenParams {
  /**
   * - true: include raw data, false: exclude raw data
   * @default true
   */
  includeRawData?: boolean;
  /**
   * - 80001:mumbai testnet, 137:polygon mainnet
   * @format double
   * @default 80001
   */
  chainId: number;
}

export interface GetTransactionsParams {
  /**
   * The desired page size of the result.
   * @format double
   * @example 10
   */
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  /**
   * The cursor returned in the previous response (used for getting the next page).
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21QYXJhbXMiOnsidG9rZW5BZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImtleXMiOlsiMTY5MzI3NzkxNC45NSJdLCJ3aGVyZSI6eyJ0b2tlbl9hZGRyZXNzIjoiMHg2YTJmNjlmNTc5YmIzMmMyNDBmNDZjNGZiNGQzMGM4YzhiY2NiYTQxIn0sImxpbWl0IjoxMSwib2Zmc2V0IjowLCJvcmRlciI6W10sImRpc2FibGVfdG90YWwiOnRydWUsImV4Y2x1ZGVfc3BhbSI6ZmFsc2UsInRvdGFsIjpudWxsLCJwYWdlIjoxLCJ0YWlsT2Zmc2V0IjoxLCJpYXQiOjE2OTQwNjcyNzZ9.mv1I78rtooJ7_rP03CpQHuqj9J7ds1VucZVu1yaGYZQ"
   */
  pageCursor?: string;
  /** - 97:BSC testnet, 56:BSC mainnet, 80001:mumbai testnet, 137:polygon mainnet */
  chainId: SupportChainId;
  /** - wallet address */
  walletAddress: string;
}

export interface FindManyWebhooksParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
}

export interface FindManyAppWebhooksParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** 'DEV' | 'PRD' */
  profile?: 'DEV' | 'PRD';
  /** @format double */
  appId: number;
}

export interface FindManyAppWebhookLogsParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** YYYY-MM-DD */
  from?: string;
  /** YYYY-MM-DD */
  to?: string;
  /** 'DEV' | 'PRD' */
  profile?: 'DEV' | 'PRD';
  /** 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT' */
  webhookKindCd?: 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT';
  /** 'Success'|'Fail' */
  logStatus?: 'Success' | 'Fail';
  /**
   * 앱 id
   * @format double
   */
  appId: number;
}

export interface DownloadAppWebhookLogsExcelParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** YYYY-MM-DD */
  from?: string;
  /** YYYY-MM-DD */
  to?: string;
  /** 'DEV' | 'PRD' */
  profile?: 'DEV' | 'PRD';
  /** 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT' */
  webhookKindCd?: 'SWAP' | 'TOKEN_IN' | 'NFT_MINT' | 'REVIEW_RESULT';
  /** 'Success'|'Fail' */
  logStatus?: 'Success' | 'Fail';
  /** @format double */
  appId: number;
}

export interface FindManyWorkspacesParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** @format double */
  appId: number;
}

export interface FindManyWorkspaceMembersParams {
  /**
   * 가져올 열 수.
   * @format double
   */
  pageSize?: number;
  /**
   * 페이지 번호.
   * @format double
   */
  pageNo?: number;
  /** @format double */
  appId: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '/api',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title platpome-console-backend
 * @version 0.0.1
 * @baseUrl /api
 * @contact
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  common = {
    /**
     * @description 공통 코드 그룹 목록 조회 API
     *
     * @tags [공통] Common
     * @name FindManyCodeGroups
     * @request GET:/common/code-groups
     */
    findManyCodeGroups: (
      query: FindManyCodeGroupsParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseCommonCodeGroupQueryResponseArray, any>({
        path: `/common/code-groups`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 공통 코드 목록 조회 API
     *
     * @tags [공통] Common
     * @name FindManyCodes
     * @request GET:/common/codes
     */
    findManyCodes: (query: FindManyCodesParams, params: RequestParams = {}) =>
      this.request<CommonResponseCommonCodeArray, any>({
        path: `/common/codes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description S3 파일 업로드 및 파일정보 DB 저장 API
     *
     * @tags [공통] Common
     * @name CreateAttachFile
     * @request POST:/common/s3
     */
    createAttachFile: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAttachFile, any>({
        path: `/common/s3`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description 핸드폰 인증 > 문자 발송 API
     *
     * @tags [콘솔 회원] ConsoleMember, [공통] Common
     * @name SendCertificationSms
     * @request POST:/common/sms/certification
     */
    sendCertificationSms: (
      data: SendCertificationSMSRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseSendCertificationSMSResponse, any>({
        path: `/common/sms/certification`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 핸드폰 인증 > 번호 인증 API
     *
     * @tags [콘솔 회원] ConsoleMember, [공통] Common
     * @name CertificateCode
     * @request POST:/common/sms/certification/{messageId}
     */
    certificateCode: (
      messageId: string,
      data: CertificateCodeRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponse, any>({
        path: `/common/sms/certification/${messageId}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 콘솔에서 취급하는 블록체인 목록 조회
     *
     * @tags [공통] Blockchain
     * @name FindManyBlockChains
     * @request GET:/common/blockchains
     */
    findManyBlockChains: (params: RequestParams = {}) =>
      this.request<CommonResponseBlockChainResponseTypeArray, any>({
        path: `/common/blockchains`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  ping = {
    /**
     * No description
     *
     * @tags Sample
     * @name GetMessage
     * @request GET:/ping
     */
    getMessage: (params: RequestParams = {}) =>
      this.request<PingResponse, any>({
        path: `/ping`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sample
     * @name GetMessageDb
     * @request GET:/ping/db
     */
    getMessageDb: (params: RequestParams = {}) =>
      this.request<PingResponse, any>({
        path: `/ping/db`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sample
     * @name GetMessageSecurity
     * @request GET:/ping/security
     * @secure
     */
    getMessageSecurity: (params: RequestParams = {}) =>
      this.request<PingResponse, any>({
        path: `/ping/security`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  apps = {
    /**
     * @description 콘솔 메인 홈 > 앱 등록 API
     *
     * @tags [앱] App
     * @name CreateApp
     * @request POST:/apps
     * @secure
     */
    createApp: (data: CreateAppRequest, params: RequestParams = {}) =>
      this.request<CommonResponseApp, any>({
        path: `/apps`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags [앱] App
     * @name FindManyApps
     * @request GET:/apps
     * @secure
     */
    findManyApps: (query: FindManyAppsParams, params: RequestParams = {}) =>
      this.request<CommonResponseFindManyAppsQueryResponseArray, any>({
        path: `/apps`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 정보 수정 API
     *
     * @tags [앱] App
     * @name UpdateApp
     * @request PUT:/apps/{appId}
     * @secure
     */
    updateApp: (
      appId: number,
      data: UpdateAppRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseApp, any>({
        path: `/apps/${appId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 상세 조회 API
     *
     * @tags [앱] App
     * @name FindApp
     * @request GET:/apps/{appId}
     * @secure
     */
    findApp: (appId: number, params: RequestParams = {}) =>
      this.request<CommonResponseAppDetailResponseType, any>({
        path: `/apps/${appId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 API KEY 발급 API
     *
     * @tags [앱 API] AppApi, [앱] App
     * @name CreateAppApiKeys
     * @request POST:/apps/api-keys
     * @secure
     */
    createAppApiKeys: (
      data: CreateAppApiKeyRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppApiKey, any>({
        path: `/apps/api-keys`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 API KEY 목록 조회 API
     *
     * @tags [앱 API] AppApi, [앱] App
     * @name FindManyAppApiKeys
     * @request GET:/apps/api-keys/{appId}
     * @secure
     */
    findManyAppApiKeys: (appId: number, params: RequestParams = {}) =>
      this.request<CommonResponseAppApiKeyArray, any>({
        path: `/apps/api-keys/${appId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 지갑 보유 토큰 조회
     *
     * @tags [앱] App
     * @name GetAppWalletBalance
     * @request GET:/apps/{appId}/chains/{chainId}/tokens
     */
    getAppWalletBalance: (
      chainId: SupportChainId,
      appId: number,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWalletBalanceArray, any>({
        path: `/apps/${appId}/chains/${chainId}/tokens`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 API KEY 삭제 API
     *
     * @tags [앱 API] AppApi, [앱] App
     * @name DeleteAppApiKey
     * @request DELETE:/apps/api-keys/{apiKeyId}
     * @secure
     */
    deleteAppApiKey: (apiKeyId: number, params: RequestParams = {}) =>
      this.request<CommonResponse, any>({
        path: `/apps/api-keys/${apiKeyId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  members = {
    /**
     * @description 회원 가입 여부 확인 API
     *
     * @tags [콘솔 회원] ConsoleMember
     * @name CheckMemberExist
     * @request GET:/members/check
     * @secure
     */
    checkMemberExist: (params: RequestParams = {}) =>
      this.request<
        {
          error: ErrorVo;
          /** @format double */
          total: number;
          data: any;
        },
        any
      >({
        path: `/members/check`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 내 정보 조회 API
     *
     * @tags [콘솔 회원] ConsoleMember
     * @name FindMe
     * @request GET:/members/me
     * @secure
     */
    findMe: (params: RequestParams = {}) =>
      this.request<CommonResponseConsoleMember, any>({
        path: `/members/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 개발자 콘솔 회원 등록 API
     *
     * @tags [콘솔 회원] ConsoleMember
     * @name CreateConsoleMember
     * @request POST:/members
     * @secure
     */
    createConsoleMember: (
      data: CreateConsoleMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseConsoleMember, any>({
        path: `/members`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 개발자 콘솔 회원 목록 조회 API
     *
     * @tags [콘솔 회원] ConsoleMember, [세팅] Setting, [콘솔 회원] ConsoleMember
     * @name FindManyConsoleMembers
     * @request GET:/members
     * @secure
     */
    findManyConsoleMembers: (
      query: FindManyConsoleMembersParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseConsoleMemberArray, any>({
        path: `/members`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 개발자 콘솔 회원 수정 API
     *
     * @tags [콘솔 회원] ConsoleMember
     * @name UpdateConsoleMember
     * @request PUT:/members/{memberId}
     * @secure
     */
    updateConsoleMember: (
      memberId: number,
      data: UpdateConsoleMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseConsoleMember, any>({
        path: `/members/${memberId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 개발자 콘솔 회원 상세 조회 API
     *
     * @tags [콘솔 회원] ConsoleMember
     * @name FindConsoleMember
     * @request GET:/members/{memberId}
     * @secure
     */
    findConsoleMember: (memberId: number, params: RequestParams = {}) =>
      this.request<CommonResponseConsoleMember, any>({
        path: `/members/${memberId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  chains = {
    /**
     * @description 마켓에 NFT 등록 createDirectListing
     *
     * @tags [Marketplace] Common
     * @name CreateDirectListing
     * @request POST:/chains/{chainId}/marketplace/{appId}/direct-listings
     */
    createDirectListing: (
      { chainId, appId, ...query }: CreateDirectListingParams,
      data: DirectListingRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseDirectListingResponse, any>({
        path: `/chains/${chainId}/marketplace/${appId}/direct-listings`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 마켓 플레이스에 등록된 NFT 등록 취소 API
     *
     * @tags [Marketplace] Common
     * @name RemoveFromListing
     * @request POST:/chains/{chainId}/marketplace/remove-listings
     */
    removeFromListing: (
      chainId: SupportChainId,
      data: CancelListingRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/chains/${chainId}/marketplace/remove-listings`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 마켓 플레이스에 등록된 NFT의 가격 수정 API
     *
     * @tags [Marketplace] Common
     * @name ChangePriceFromListing
     * @request PUT:/chains/{chainId}/marketplace/change-price
     */
    changePriceFromListing: (
      chainId: SupportChainId,
      data: ChangePriceRequest,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          error: ErrorVo;
          /** @format double */
          total: number;
          data: any;
        },
        any
      >({
        path: `/chains/${chainId}/marketplace/change-price`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 마켓플레이스 컨트랙트에 등록된 NFT 목록 조회
     *
     * @tags [Marketplace] Common
     * @name GetListings
     * @request GET:/chains/{chainId}/marketplace/listings
     */
    getListings: (chainId: SupportChainId, params: RequestParams = {}) =>
      this.request<
        {
          error: ErrorVo;
          /** @format double */
          total: number;
          data: any;
        },
        any
      >({
        path: `/chains/${chainId}/marketplace/listings`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 트랜잭션 목록 조회 API
     *
     * @tags [Marketplace] Common
     * @name FindManyTokenActivities
     * @request GET:/chains/{chainId}/marketplace/listings/{tokenId}
     */
    findManyTokenActivities: (
      { chainId, tokenId, ...query }: FindManyTokenActivitiesParams,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          error: ErrorVo;
          /** @format double */
          total: number;
          data: any;
        },
        any
      >({
        path: `/chains/${chainId}/marketplace/listings/${tokenId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 마켓플레이스 NFT 목록 조회 - 유효목록 조회 [유효조건] 목록이 만료되지 않았습니다(시간이 endTimeInSeconds 이전임). 목록이 취소되지 않았습니다. 목록이 매수되지 않았습니다(모든 수량의 NFT를 구매하지 않았습니다).
     *
     * @tags [Marketplace] Common
     * @name GetValidListings
     * @request GET:/chains/{chainId}/marketplace/direct-listings
     */
    getValidListings: (
      { chainId, ...query }: GetValidListingsParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseListingResponse, any>({
        path: `/chains/${chainId}/marketplace/direct-listings`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description IPFS 업로드
     *
     * @tags [NFT] Common
     * @name IpfsUpload
     * @request POST:/chains/{chainId}/ipfs/upload
     * @secure
     */
    ipfsUpload: (
      chainId: SupportChainId,
      data: {
        title: string;
        description: string;
        /** @format binary */
        file: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseIpfsResponse, any>({
        path: `/chains/${chainId}/ipfs/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 일괄 민팅 (ERC1155)
     *
     * @tags [NFT] Common
     * @name MintBatch
     * @request POST:/chains/{chainId}/erc1155/mint-batch
     * @secure
     */
    mintBatch: (
      chainId: SupportChainId,
      data: MintBatchRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/chains/${chainId}/erc1155/mint-batch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 일괄 민팅 (ERC1155)
     *
     * @tags [NFT] Common
     * @name MintBatchTo
     * @request POST:/chains/{chainId}/wallets/{toAddress}/erc1155/mint-batch
     * @secure
     */
    mintBatchTo: (
      chainId: SupportChainId,
      toAddress: string,
      data: MintBatchToRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/chains/${chainId}/wallets/${toAddress}/erc1155/mint-batch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 추가 민팅
     *
     * @tags [NFT] Common
     * @name MintAdditionalSupply
     * @request POST:/chains/{chainId}/erc1155/mint-additional
     * @secure
     */
    mintAdditionalSupply: (
      chainId: SupportChainId,
      data: MintAdditionalSupplyRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/chains/${chainId}/erc1155/mint-additional`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 목록 조회
     *
     * @tags [NFT] Common
     * @name GetNfTs
     * @request GET:/chains/{chainId}/erc1155
     * @secure
     */
    getNfTs: (chainId: SupportChainId, params: RequestParams = {}) =>
      this.request<CommonResponseNftItemDataTypeArray, any>({
        path: `/chains/${chainId}/erc1155`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description NFT 목록 지갑주소로 조회
     *
     * @tags [NFT] Common
     * @name GetOwnedNfTs
     * @request GET:/chains/{chainId}/wallets/{walletAddress}/erc1155
     * @secure
     */
    getOwnedNfTs: (
      chainId: SupportChainId,
      walletAddress: string,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseNftItemDataTypeArray, any>({
        path: `/chains/${chainId}/wallets/${walletAddress}/erc1155`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags [NFT] Common
     * @name GetNft
     * @request GET:/chains/{chainId}/erc1155/{tokenId}
     * @secure
     */
    getNft: (
      chainId: SupportChainId,
      tokenId: number,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseNftItemDetailDataType, any>({
        path: `/chains/${chainId}/erc1155/${tokenId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 전체 발행 된 NFT의 보유 목록 조회
     *
     * @tags [NFT] Common
     * @name GetNftOwners
     * @request GET:/chains/{chainId}/erc1155/holders/{contractAddress}
     * @secure
     */
    getNftOwners: (
      { chainId, contractAddress, ...query }: GetNftOwnersParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/chains/${chainId}/erc1155/holders/${contractAddress}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 토큰 소유자 목록 호출
     *
     * @tags [NFT] Common
     * @name GetNftOwnersByTokenId
     * @request GET:/chains/{chainId}/erc1155/{contractAddress}/{tokenId}/holders
     * @secure
     */
    getNftOwnersByTokenId: (
      {
        chainId,
        contractAddress,
        tokenId,
        ...query
      }: GetNftOwnersByTokenIdParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseNFTOwnersResponseType, any>({
        path: `/chains/${chainId}/erc1155/${contractAddress}/${tokenId}/holders`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Token 트랜잭션 목록 호출
     *
     * @tags [NFT] Common
     * @name GetNftTransactionsByTokenId
     * @request GET:/chains/{chainId}/erc1155/{contractAddress}/{tokenId}/transactions
     */
    getNftTransactionsByTokenId: (
      {
        chainId,
        contractAddress,
        tokenId,
        ...query
      }: GetNftTransactionsByTokenIdParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseNFTTransactionResponseType, any>({
        path: `/chains/${chainId}/erc1155/${contractAddress}/${tokenId}/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  release = {
    /**
     * @description 앱 출시 심사 요청 API
     *
     * @tags [출시] Release
     * @name ApplyRelease
     * @request POST:/release
     * @secure
     */
    applyRelease: (data: ApplyReleaseRequest, params: RequestParams = {}) =>
      this.request<CommonResponseApp, any>({
        path: `/release`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 출시 심사 신청 취소 API
     *
     * @tags [출시] Release
     * @name CancelApplyRelease
     * @request PUT:/release/{appId}
     * @secure
     */
    cancelApplyRelease: (appId: number, params: RequestParams = {}) =>
      this.request<CommonResponse, any>({
        path: `/release/${appId}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 심사 내역 목록 조회 API
     *
     * @tags [출시] Release
     * @name GetReleaseHistories
     * @request GET:/release/{appId}
     * @secure
     */
    getReleaseHistories: (
      { appId, ...query }: GetReleaseHistoriesParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseFindManyReleaseHistoryResponseArray, any>({
        path: `/release/${appId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 출시 심사 승인 API
     *
     * @tags [출시] Release
     * @name ApproveRelease
     * @request POST:/release/approve/{reviewId}
     * @secure
     */
    approveRelease: (reviewId: number, params: RequestParams = {}) =>
      this.request<CommonResponseApp, any>({
        path: `/release/approve/${reviewId}`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  tokens = {
    /**
     * @description ERC20 토큰 전송 API 시뮬레이션
     *
     * @tags [토큰] Token
     * @name SimulatesTransferToken
     * @request POST:/tokens/simulates
     * @secure
     */
    simulatesTransferToken: (
      data: TokenTransferRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseSimulateTxResponse, any>({
        path: `/tokens/simulates`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description ERC20 토큰 전송 API
     *
     * @tags [토큰] Token
     * @name TransferToken
     * @request POST:/tokens
     * @secure
     */
    transferToken: (data: TokenTransferRequest, params: RequestParams = {}) =>
      this.request<CommonResponse, any>({
        path: `/tokens`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  wallets = {
    /**
     * @description 지갑 설정 및 기능 마스터 외 멤버 접근 허용/비허용 처리 API
     *
     * @tags [Wallet] Common
     * @name ToggleMemberAccess
     * @request PUT:/wallets/{appId}/member-access/{walletId}
     * @secure
     */
    toggleMemberAccess: (
      appId: number,
      walletId: number,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/wallets/${appId}/member-access/${walletId}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 지갑 자동서명 허용/비허용 처리 API
     *
     * @tags [Wallet] Common
     * @name ToggleAutoSign
     * @request PUT:/wallets/{appId}/auto-sign/{walletId}
     * @secure
     */
    toggleAutoSign: (
      appId: number,
      walletId: number,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @format double */
          total: number;
          error: ErrorVo;
          data: any;
        },
        any
      >({
        path: `/wallets/${appId}/auto-sign/${walletId}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ERC20 토큰 전송 샘플
     *
     * @tags [Wallet] Common
     * @name TransferToken
     * @request POST:/wallets/{chainId}/wallets/transfer-token
     * @secure
     */
    transferToken: (
      { chainId, ...query }: TransferTokenParams,
      data: TransferTokenRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseTransferTokenResponse, any>({
        path: `/wallets/${chainId}/wallets/transfer-token`,
        method: 'POST',
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags [Wallet] Common
     * @name FindWalletDetailByAppId
     * @request GET:/wallets/{chainId}/wallets/{appId}/detail
     * @secure
     */
    findWalletDetailByAppId: (
      appId: number,
      chainId: SupportChainId,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseFindWalletByAppIdQueryResponse, any>({
        path: `/wallets/${chainId}/wallets/${appId}/detail`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 지갑 정보 조회 API
     *
     * @tags [Wallet] Common
     * @name FindWalletByAppId
     * @request GET:/wallets/{chainId}/wallets/{appId}/address
     * @secure
     */
    findWalletByAppId: (
      appId: number,
      chainId: SupportChainId,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseFindWalletByAppIdQueryResponse, any>({
        path: `/wallets/${chainId}/wallets/${appId}/address`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 지갑 transaction 내역 조회 docs: https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-wallet-transaction?address=0xd8da6bf26964af9d7eed9e03e53415d37aa96045&chain=eth&include=internal_transactions TODO: fromDate, toDate, include 옵션 추가
     *
     * @tags [Wallet] Common
     * @name GetTransactions
     * @request GET:/wallets/{chainId}/wallets/{walletAddress}/transactions
     * @secure
     */
    getTransactions: (
      { chainId, walletAddress, ...query }: GetTransactionsParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWalletTransactionsResponseType, any>({
        path: `/wallets/${chainId}/wallets/${walletAddress}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 지갑이 보유한 NFT 목록 조회 API
     *
     * @tags [Wallet] Common
     * @name GetWalletNftTokens
     * @request GET:/wallets/{chainId}/{walletAddress}/balances
     * @secure
     */
    getWalletNftTokens: (
      chainId: SupportChainId,
      walletAddress: string,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          error: ErrorVo;
          /** @format double */
          total: number;
          data: any;
        },
        any
      >({
        path: `/wallets/${chainId}/${walletAddress}/balances`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  webhooks = {
    /**
     * @description ** 웹훅 등록은 시스템으로 처리 ** 웹훅 등록 API
     *
     * @tags [웹훅] Webhook
     * @name CreateWebhook
     * @request POST:/webhooks
     * @deprecated
     */
    createWebhook: (data: CreateWebhookRequest, params: RequestParams = {}) =>
      this.request<CommonResponseWebhook, any>({
        path: `/webhooks`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 웹훅 목록 조회 API
     *
     * @tags [웹훅] Webhook
     * @name FindManyWebhooks
     * @request GET:/webhooks
     * @secure
     */
    findManyWebhooks: (
      query: FindManyWebhooksParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWebhookArray, any>({
        path: `/webhooks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 웹훅 등록 API
     *
     * @tags [웹훅] Webhook
     * @name CreateAppWebhook
     * @request POST:/webhooks/apps
     * @secure
     */
    createAppWebhook: (
      data: CreateAppWebhookRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhook, any>({
        path: `/webhooks/apps`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 웹훅 수정 API
     *
     * @tags [웹훅] Webhook
     * @name UpdateAppWebhook
     * @request PUT:/webhooks/apps
     * @secure
     */
    updateAppWebhook: (
      data: UpdateAppWebhookRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhook, any>({
        path: `/webhooks/apps`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags [웹훅] Webhook
     * @name DeleteAppWebhook
     * @request DELETE:/webhooks/apps
     * @secure
     */
    deleteAppWebhook: (
      data: DeleteAppWebhookRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhook, any>({
        path: `/webhooks/apps`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 앱 웹훅 목록 조회 API
     *
     * @tags [웹훅] Webhook
     * @name FindManyAppWebhooks
     * @request GET:/webhooks/apps/{appId}
     * @secure
     */
    findManyAppWebhooks: (
      { appId, ...query }: FindManyAppWebhooksParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhookArray, any>({
        path: `/webhooks/apps/${appId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 웹훅 로그 목록 조회 API
     *
     * @tags [웹훅] Webhook
     * @name FindManyAppWebhookLogs
     * @request GET:/webhooks/logs/{appId}
     * @secure
     */
    findManyAppWebhookLogs: (
      { appId, ...query }: FindManyAppWebhookLogsParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhookLogsQueryResponseArray, any>({
        path: `/webhooks/logs/${appId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 웹훅 로그 상세 조회 API
     *
     * @tags [웹훅] Webhook
     * @name FindAppWebhookLog
     * @request GET:/webhooks/logs/{appId}/{no}
     * @secure
     */
    findAppWebhookLog: (
      appId: number,
      no: number,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAppWebhookLog, any>({
        path: `/webhooks/logs/${appId}/${no}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 웹훅 재전송
     *
     * @tags [웹훅] Webhook
     * @name ResendAppWebhook
     * @request PUT:/webhooks/resend
     * @secure
     */
    resendAppWebhook: (
      data: ResendAppWebhookRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseAny, any>({
        path: `/webhooks/resend`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 웹 훅 목록 엑셀 다운로드 API
     *
     * @tags [웹훅] Webhook
     * @name DownloadAppWebhookLogsExcel
     * @request GET:/webhooks/excel/logs/{appId}
     * @secure
     */
    downloadAppWebhookLogsExcel: (
      { appId, ...query }: DownloadAppWebhookLogsExcelParams,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/webhooks/excel/logs/${appId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),
  };
  workspaces = {
    /**
     * @description ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 ** ** app 생성시 default 워크스페이스 생성 ** 워크스페이스 생성 API
     *
     * @tags [워크 스페이스] Workspace
     * @name CreateWorkspace
     * @request POST:/workspaces
     * @deprecated
     * @secure
     */
    createWorkspace: (
      data: CreateWorkspaceRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWorkspace, any>({
        path: `/workspaces`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 ** 앱 하위 워크스페이스 목록 조회 API
     *
     * @tags [워크 스페이스] Workspace
     * @name FindManyWorkspaces
     * @request GET:/workspaces
     * @deprecated
     * @secure
     */
    findManyWorkspaces: (
      query: FindManyWorkspacesParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseFindManyWorkspacesResponseArray, any>({
        path: `/workspaces`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 ** 워크스페이스 수정 API
     *
     * @tags [워크 스페이스] Workspace
     * @name UpdateWorkspace
     * @request PUT:/workspaces/{id}
     * @deprecated
     * @secure
     */
    updateWorkspace: (
      id: number,
      data: UpdateWorkspaceRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWorkspace, any>({
        path: `/workspaces/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description ** 0.1 버전에서는 워크스페이스 생성,수정 기획 없음 ** 워크스페이스 상세 조회 API
     *
     * @tags [워크 스페이스] Workspace
     * @name FindWorkspace
     * @request GET:/workspaces/{id}
     * @deprecated
     * @secure
     */
    findWorkspace: (id: number, params: RequestParams = {}) =>
      this.request<CommonResponseWorkspace, any>({
        path: `/workspaces/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  workspaceMembers = {
    /**
     * @description Setting > 팀원 및 권한 > 팀원 목록 조회 API
     *
     * @tags [세팅] Setting, [워크 스페이스 팀원] WorkspaceMember
     * @name FindManyWorkspaceMembers
     * @request GET:/workspace-members
     * @secure
     */
    findManyWorkspaceMembers: (
      query: FindManyWorkspaceMembersParams,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseFindManyWorkspaceMembersResponseArray, any>({
        path: `/workspace-members`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Setting > 팀원 및 권한 > 워크스페이스 소속 팀원 추가 API
     *
     * @tags [세팅] Setting, [워크 스페이스 팀원] WorkspaceMember
     * @name CreateWorkspaceMember
     * @request POST:/workspace-members
     * @secure
     */
    createWorkspaceMember: (
      data: CreateWorkspaceMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWorkspaceMember, any>({
        path: `/workspace-members`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 워크스페이스 소속 팀원 권한 수정 API
     *
     * @tags [워크 스페이스 팀원] WorkspaceMember
     * @name UpdateWorkspaceMember
     * @request PUT:/workspace-members
     * @secure
     */
    updateWorkspaceMember: (
      data: UpdateWorkspaceMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWorkspaceMember, any>({
        path: `/workspace-members`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 워크스페이스 소속 팀원 제거 API
     *
     * @tags [워크 스페이스 팀원] WorkspaceMember
     * @name DeleteWorkspaceMember
     * @request DELETE:/workspace-members
     * @secure
     */
    deleteWorkspaceMember: (
      data: DeleteWorkspaceMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponse, any>({
        path: `/workspace-members`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description ** 0.2버전으로 미뤄짐 ** Setting > 팀원 및 권한 > 팀 멤버 추가하기 (초대 메일 발송)
     *
     * @tags [세팅] Setting, [워크 스페이스 팀원] WorkspaceMember
     * @name InviteWorkspaceMember
     * @request POST:/workspace-members/invitation
     * @deprecated
     * @secure
     */
    inviteWorkspaceMember: (
      data: InviteWorkspaceMemberRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponse, any>({
        path: `/workspace-members/invitation`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description * ** 0.2버전으로 미뤄짐 ** 초대 메일 확인 후 승락/거절 처리 API
     *
     * @tags [세팅] Setting, [워크 스페이스 팀원] WorkspaceMember
     * @name UpdateInvitation
     * @request PUT:/workspace-members/invitation/{invitationId}
     * @deprecated
     * @secure
     */
    updateInvitation: (
      invitationId: number,
      data: UpdateInvitationRequest,
      params: RequestParams = {}
    ) =>
      this.request<CommonResponseWorkspaceInvitation, any>({
        path: `/workspace-members/invitation/${invitationId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
