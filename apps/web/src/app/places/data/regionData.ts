import {
  DAEJEON_DATA,
  GWANGJU_DATA,
  SEJONG_DATA,
} from './regions/central_metropolitan';
import { GYEONGGI_DATA, INCHEON_DATA } from './regions/incheon_gyeonggi';
import {
  CHUNGBUK_DATA,
  CHUNGNAM_DATA,
  GANGWON_DATA,
  JEJU_DATA,
} from './regions/provinces_1';
import {
  GYEONGBUK_DATA,
  GYEONGNAM_DATA,
  JEONBUK_DATA,
  JEONNAM_DATA,
} from './regions/provinces_2';
import { SEOUL_DATA } from './regions/seoul';
import {
  BUSAN_DATA,
  DAEGU_DATA,
  ULSAN_DATA,
} from './regions/southern_metropolitan';

export interface RegionData {
  [sido: string]: {
    [sigungu: string]: string[];
  };
}

export const REGION_DATA: RegionData = {
  서울: SEOUL_DATA,
  경기: GYEONGGI_DATA,
  인천: INCHEON_DATA,
  부산: BUSAN_DATA,
  대구: DAEGU_DATA,
  울산: ULSAN_DATA,
  광주: GWANGJU_DATA,
  대전: DAEJEON_DATA,
  세종: SEJONG_DATA,
  강원: GANGWON_DATA,
  충북: CHUNGBUK_DATA,
  충남: CHUNGNAM_DATA,
  전북: JEONBUK_DATA,
  전남: JEONNAM_DATA,
  경북: GYEONGBUK_DATA,
  경남: GYEONGNAM_DATA,
  제주: JEJU_DATA,
};
