<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DenunciaController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $denuncias = Denuncia::with(['arquivos', 'comentarios'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/AdminDenuncias', [
            'denuncias' => $denuncias
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/AdminDenunciaForm', [
            'denuncia' => null
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

        return redirect()->route('admin.denuncias.index')
            ->with('success', 'Denúncia criada com sucesso!');
    }

    public function show(Denuncia $denuncia)
    {
        $denuncia->load(['arquivos', 'comentarios']);

        return Inertia::render('admin/AdminDetalhesDenuncia', [
            'denuncia' => $denuncia
        ]);
    }

    public function edit(Denuncia $denuncia)
    {
        $denuncia->load(['arquivos', 'comentarios']);

        return Inertia::render('admin/AdminDenunciaForm', [
            'denuncia' => $denuncia
        ]);
    }

    public function update(Request $request, Denuncia $denuncia)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'localizacao' => 'required|string|max:255',
            'contato' => 'nullable|string|max:255',
            'status' => 'required|in:pendente,em_analise,resolvida,arquivada',
        ]);

        $denuncia->update($validated);

        return redirect()->route('admin.denuncias.index')
            ->with('success', 'Denúncia atualizada com sucesso!');
    }

    public function destroy(Denuncia $denuncia)
    {
        $denuncia->delete();

        return redirect()->route('admin.denuncias.index')
            ->with('success', 'Denúncia excluída com sucesso!');
    }

    public function listByStatus($status)
    {
        $denuncias = Denuncia::with(['usuario', 'arquivos'])
            ->where('status', $status)
            ->latest()
            ->paginate(10);

        return Inertia::render('Denuncias', [
            'denuncias' => $denuncias,
            'filtroStatus' => $status
        ]);
    }

    public function reports()
    {
        $totalDenuncias = Denuncia::count();
        $denunciasPorStatus = Denuncia::select('status')
            ->selectRaw('count(*) as total')
            ->groupBy('status')
            ->get();

        return Inertia::render('admin/AdminReports', [
            'totalDenuncias' => $totalDenuncias,
            'denunciasPorStatus' => $denunciasPorStatus,
        ]);
    }
}
