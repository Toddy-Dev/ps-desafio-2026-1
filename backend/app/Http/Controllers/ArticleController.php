<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorearticlesRequest;
use App\Http\Requests\UpdatearticlesRequest;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Support\Facades\Storage as FacadesStorage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ArticleController extends Controller
{
    protected $articles;

    public function __construct(Articles $articles){
        $this->articles = $articles;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $articles = $this->articles->all();
        return response()->json($articles, Response::HTTP_OK);
    }

   

    public function store(StorearticlesRequest $request)
    {
        $data = $request->validated();
        if(request()->hasFile('image')){
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = url('storage/'.$path);
            $instrument = $this->articles->create($data);
            $id = $instrument->id;
            $instrument_category = $this->articles->with('category')->findOrFail($id);

            return response()->json($instrument_category, Response::HTTP_CREATED);

        };
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $articles = $this->articles->with('category')->findOrFail($id);
        return response()->json($articles, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatearticlesRequest $request, $id): JsonResponse
    {   $articles = $this->articles->with('category')->findOrFail($id);
        $data = $request->validated();
        if(request()->hasFile('image')){
            try{
                $image_name = explode('articles/', $articles['image']);
                FacadesStorage::disk('public')->delete('articles/'.$image_name[1]);
            } catch (Throwable){    
            } finally{
                $path = $request->file('image')->store('articles', 'public');
                $data['image'] = url('storage'.$path);
            }
        }
        $articles->update($data);
        return response()->json($articles, Response::HTTP_OK);
    }
    /**
     * Realiza a "compra" de um artigo (diminui o estoque).
     */
    public function buy($id): JsonResponse
    {
        $article = $this->articles->findOrFail($id);

        if ($article->amount <= 0) {
            return response()->json(['message' => '"ERRO, este artigo está esgotado!'], Response::HTTP_BAD_REQUEST);
        }
        $article->decrement('amount');
        $article->refresh();
        return response()->json([ 'message' => 'Compra realizada com sucesso!','article' => $article], Response::HTTP_OK);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $articles = $this->articles->findOrFail($id);
        $articles->delete();
        return response()->json(['message' => "Artigo deletado com sucesso!!"]);
    }
}
