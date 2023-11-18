<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $task = $this->route()->parameter('task');

        return $task->user_id === Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'         => ['required', 'min:3', 'max:100', 'string'],
            'description'   => ['sometimes', 'max:1000', 'string', 'nullable'],
            'due_at'        => ['date'],
            'status'        => ['required', 'in:Todo,In Progress,Done'],
            'sort'          => ['numeric']
        ];
    }
}
