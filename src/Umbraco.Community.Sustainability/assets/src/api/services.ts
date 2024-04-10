import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { SustainabilityData } from './models';

export class SustainabilityResource {

	/**
	 * @returns unknown Success
	 * @throws ApiError
	 */
	public static checkPage(data: SustainabilityData['payloads']['CheckPage'] = {}): CancelablePromise<SustainabilityData['responses']['CheckPage']> {
		const {
                    
                    pageGuid
                } = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/umbraco/sustainability/api/v1/checkPage',
			query: {
				pageGuid
			},
		});
	}

	/**
	 * @returns unknown Success
	 * @throws ApiError
	 */
	public static getPageData(data: SustainabilityData['payloads']['GetPageData'] = {}): CancelablePromise<SustainabilityData['responses']['GetPageData']> {
		const {
                    
                    pageGuid
                } = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/umbraco/sustainability/api/v1/getPageData',
			query: {
				pageGuid
			},
		});
	}

	/**
	 * @returns boolean Success
	 * @throws ApiError
	 */
	public static savePageData(data: SustainabilityData['payloads']['SavePageData'] = {}): CancelablePromise<SustainabilityData['responses']['SavePageData']> {
		const {
                    
                    pageGuid,
requestBody
                } = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/umbraco/sustainability/api/v1/savePageData',
			query: {
				pageGuid
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

}