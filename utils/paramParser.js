module.exports = class ParamParser {
    parseQueryArguments(request) {
        if (!this.validLimitArg(request)) {
            return {
                status: 'error',
                message: 'Arguments limit must be a valid positive integer'
            }
        }

        if (!this.foundCoordinate(request)) {
            return {
                status: 'error',
                message: 'Arguments latitude and longitude are required'
            }
        }
        if (!this.validCoordinateDataType(request)) {
            return {
                status: 'error',
                message: 'Arguments latitude and longitude must be valid decimals'
            }
        }

        if (!this.validCoordinateRange(request)) {
            return {
                status: 'error',
                message: 'Valid range for latitude is [-90, 90] and valid range for longitude is [-180, 80]'
            }
        }
        return null;
    }

    /**
     * If a limit arg is given, it must be a valid positive integer
     * @param request
     * @returns {boolean|boolean}
     */
    validLimitArg(request) {
        if (request.query.limit === undefined) {
            return true;
        }

        let value = parseInt(request.query.limit);
        return Number.isInteger(value) && value > 0
    }

    foundCoordinate(request) {
        return request.query.latitude !== undefined && request.query.longitude !== undefined;
    }

    /**
     * Return true if the lat and long arguments are valid numbers
     * @param request
     * @returns {boolean|boolean}
     */
    validCoordinateDataType(request) {
        return !isNaN(request.query.latitude) && !isNaN(request.query.longitude);
    }

    validCoordinateRange(request) {
        return request.query.latitude >= -90 &&
            request.query.latitude <= 90 &&
            request.query.longitude >= -180 &&
            request.query.longitude <= 80;
    }
};