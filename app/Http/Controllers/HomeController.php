<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $denuncias = Denuncia::with(['usuario', 'arquivos'])
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();
        return Inertia::render('Home', [
            'denuncias' => $denuncias
        ]);
    }

    public function index()
    {
        $denuncias = Denuncia::latest()->take(6)->get();
        
        $estatisticas = [
            'totalDenuncias' => Denuncia::count(),
            'denunciasEmAnalise' => Denuncia::where('status', 'em_analise')->count(),
            'denunciasResolvidas' => Denuncia::where('status', 'resolvida')->count(),
        ];

        return Inertia::render('Index', [
            'denuncias' => $denuncias,
            'estatisticas' => $estatisticas
        ]);
    }
} 