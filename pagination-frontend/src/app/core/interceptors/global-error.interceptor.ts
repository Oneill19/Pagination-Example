/* eslint-disable */
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	handleError(error: any) {
		const chunkFailedMessage = /Loading chunk [\d]+ failed/;

		if (chunkFailedMessage.test(error.message)) {
			window.location.reload();
		}

		console.error(error);
	}
}
