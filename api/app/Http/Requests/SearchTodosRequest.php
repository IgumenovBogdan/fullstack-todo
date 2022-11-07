<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchTodosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            's' => 'string|nullable',
            'order' => 'string|in:asc,desc|nullable',
            'orderBy' => 'string|in:title,is_completed|nullable'
        ];
    }
}
