package com.psidox.saddlewoof.web.model.standard;

public class RestResponse {

    public enum Result {
        SUCCESS("success"),
        FAILED("failed");

        private final String value;

        private Result(String extension) {
            this.value = extension;
        }

        public String getValue() {
            return this.value;
        }

    };

    private Result result;
    private String message;
    private Exception exception;

    public RestResponse() {
    }

    public RestResponse(Result result) {
        this.result = result;
    }

    public RestResponse(Result result, String message) {
        this.result = result;
        this.message = message;
    }

    public RestResponse(Result result, Exception exception) {
        this.result = result;
        this.exception = exception;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Exception getException() {
        return exception;
    }

    public void setException(Exception exception) {
        this.exception = exception;
    }
}
