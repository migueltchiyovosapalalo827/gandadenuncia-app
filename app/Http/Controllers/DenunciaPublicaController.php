<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use Inertia\Inertia;

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
} 