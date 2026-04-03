<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use illuminate\support\Facades\Storage as FacadesStorage;
use illuminate\container\Attributes\Storage;
use Nette\Utils\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    protected $category;

    public function __construct(Category $category){
        $this->category = $category;
    }

    public function index(): JsonResponse
    {
        $categories = $this->category->with('articles')->get();
        return response()->json($categories, Response::HTTP_OK);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $category = $this->category->create($data);
        return response()->json($category, Response::HTTP_CREATED);
    }


    public function show($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        return response()->json($category, Response::HTTP_OK);
    }

    public function update(UpdateCategoryRequest $request, $id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $data = $request->validated();
        $category->update($data);
        return response()->json($category, Response::HTTP_OK);
    }

    public function destroy($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'CATEGORIA DELETADA!!!']);
    }
}
