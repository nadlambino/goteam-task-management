<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Returns a single format for successful response
     *
     * @param array $data
     * @param array $metadata
     * @param integer $code
     * @return JsonResponse
     */
    protected function successResponse(array $data = [], array $metadata = [], int $code = 200): JsonResponse
    {
        return response()->json([
            'data'      => $data,
            'metadata'  => $metadata
        ], $code);
    }

    /**
     * Returns a single format of error response
     *
     * @param string $message
     * @param array $errors
     * @param integer $code
     * @return JsonResponse
     */
    protected function errorResponse(string $message = '', array $errors = [], int $code = 500): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors'  => $errors
        ], $code);
    }
}
