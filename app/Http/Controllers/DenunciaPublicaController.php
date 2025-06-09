<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Denuncia;
use Illuminate\Http\Request;

class DenunciaPublicaController extends Controller
{
    public function create()
    {
        return Inertia::render('NovaDenuncia');
    }

    public function sent()
    {
        return Inertia::render('DenunciaEnviada');
    }

    public function search()
    {
        $denuncias = Denuncia::with(['usuario', 'arquivos'])
            ->latest()
            ->get();

        return Inertia::render('ConsultarDenuncias', [
            'denuncias' => $denuncias
        ]);
    }

    public function show($denuncia)
    {
        $denuncia = Denuncia::with(['usuario', 'arquivos', 'comentarios'])
            ->findOrFail($denuncia);

        return Inertia::render('DetalhesDenunciaPublica', [
            'denuncia' => $denuncia
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'localizacao' => 'required|string|max:255',
            'contato' => 'nullable|string|max:255',
            'status' => 'required|in:pendente,em_analise,resolvida,arquivada',
        ]);

        $denuncia = Denuncia::create($validated);

        return redirect()->route('denuncias.sent')
            ->with('success', 'Denúncia enviada com sucesso!');
    }
} 