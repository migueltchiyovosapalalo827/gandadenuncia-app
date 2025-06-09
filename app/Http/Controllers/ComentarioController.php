<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Denuncia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    public function store(Request $request, Denuncia $denuncia)
    {
        $request->validate([
            'conteudo' => 'required|string'
        ]);

        $comentario = $denuncia->comentarios()->create([
            'conteudo' => $request->conteudo,
            'usuario_id' => Auth::id()
        ]);

        return back()->with('message', 'Comentário adicionado com sucesso!');
    }

    public function update(Request $request, Comentario $comentario)
    {
        

        $request->validate([
            'conteudo' => 'required|string'
        ]);

        $comentario->update([
            'conteudo' => $request->conteudo
        ]);

        return back()->with('message', 'Comentário atualizado com sucesso!');
    }

    public function destroy(Comentario $comentario)
    {
        

        $comentario->delete();

        return back()->with('message', 'Comentário excluído com sucesso!');
    }
} 