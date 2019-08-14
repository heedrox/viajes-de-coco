const FAILED_DURATION_MSECS = 10000;

export const isFailed = (failedDate) => (new Date() - failedDate) < FAILED_DURATION_MSECS;
