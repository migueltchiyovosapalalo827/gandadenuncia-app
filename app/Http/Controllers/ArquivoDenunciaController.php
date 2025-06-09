<?php

namespace App\Http\Controllers;

use App\Models\ArquivoDenuncia;
use App\Models\Denuncia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ArquivoDenunciaController extends Controller
{
    use AuthorizesRequests;

    public function store(Request $request, Denuncia $denuncia)
    {
        $request->validate([
            'arquivo' => 'required|file|max:10240', // 10MB max
            'descricao' => 'nullable|string|max:255'
        ]);

        $path = $request->file('arquivo')->store('denuncias', 'public');

        $arquivo = $denuncia->arquivos()->create([
            'nome' => $request->file('arquivo')->getClientOriginalName(),
            'caminho' => $path,
            'tipo' => $request->file('arquivo')->getMimeType(),
            'tamanho' => $request->file('arquivo')->getSize(),
            'descricao' => $request->descricao
        ]);

        return back()->with('message', 'Arquivo enviado com sucesso!');
    }

    public function destroy(ArquivoDenuncia $arquivo)
    {
        $this->authorize('delete', $arquivo);

        Storage::disk('public')->delete($arquivo->caminho);
        $arquivo->delete();

        return back()->with('message', 'Arquivo excluído com sucesso!');
    }

    public function download(ArquivoDenuncia $arquivo)
    {
        $path = storage_path('app/public/' . $arquivo->caminho);
        return response()->file($path, [
            'Content-Disposition' => 'attachment; filename="' . $arquivo->nome . '"'
        ]);
    }
} 