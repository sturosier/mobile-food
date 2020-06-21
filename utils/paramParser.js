module.exports = class ParamParser {
    parseQueryArguments(request) {
        if (!this.foundCoordinate(request)) {
            return {
                status: 'error',
                message: 'Arguments latitude and longitude are required'
            }
        } else if (!this.validCoordinateDataType(request)) {
            return {
                status: 'error',
                message: 'Arguments latitude and longitude must be valid decimals'
            }
        } else if (!this.validCoordinateRange(request)) {
            return {
                status: 'error',
                message: 'Valid range for latitude is [-90, 90] and valid range for longitude is [-180, 80]'
            }
        } else {
            return null;
        }
    }

    foundCoordinate(request) {
        return request.query.latitude !== undefined && request.query.longitude !== undefined;
    }

    validCoordinateDataType(request) {
        return typeof parseFloat(request.query.latitude) == 'number'&&
            typeof parseFloat(request.query.longitude) == 'number';
    }

    validCoordinateRange(request) {
        return request.query.latitude >= -90 &&
            request.query.latitude <= 90 &&
            request.query.longitude >= -180 &&
            request.query.longitude <= 80;
    }
};