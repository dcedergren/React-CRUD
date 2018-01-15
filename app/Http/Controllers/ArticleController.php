<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $image = $request->img;
        $uploadTo = 'uploads/' . str_random(14);
        $fileName = $image->getClientOriginalName();
        $success = $image->move($uploadTo, $fileName);

        if($success)
        {
            $article = new Article();
            $article->title = $request->title;
            $article->text = $request->text;
            $article->img = '../' . $success;
            $article->slug = str_slug($request->title, '-');
            $article->save();
            return response()->json('Successfully added');
        }
        else
        {
            return response()->json('Fail');
        }             
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $article = Article::find($id);
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        $article->title = $request->title;
        $article->text = $request->text;
        $directory = explode('/', $request->img);

        if($directory[1] == 'tmp')
        {
            $uploadTo = 'uploads';
            $fileName = str_random(40) . '.jpg';
            $success = $request->img->move($uploadTo, $fileName);

            if($success)
            {
                $article->img = '../' . $success;
            }
            else
            {
                return response()->json('Failed to upload image');
            }                
        }
        else
        {
            $article->img = $request->img;
        }

        $article->save();
        return response()->json('Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();

        return response()->json('Successfully deleted');
    }
}
