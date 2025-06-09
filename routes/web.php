<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/nova-denuncia', function () {
    return Inertia::render('NovaDenuncia');
})->name('denuncias.create');

Route::get('/denuncia-enviada', function () {
    return Inertia::render('DenunciaEnviada');
})->name('denuncias.sent');

Route::get('/consultar', function () {
    $denuncias = \App\Models\Denuncia::with(['usuario', 'arquivos'])
        ->latest()
        ->get();

    return Inertia::render('ConsultarDenuncias', [
        'denuncias' => $denuncias
    ]);
})->name('denuncias.search');

Route::get('/denuncias/{denuncia}', function ($denuncia) {
    $denuncia = \App\Models\Denuncia::with(['usuario', 'arquivos', 'comentarios'])
        ->findOrFail($denuncia);

    return Inertia::render('DetalhesDenunciaPublica', [
        'denuncia' => $denuncia
    ]);
})->name('denuncias.show');




// Rotas administrativas
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    
    // Rotas de Denúncias
    Route::get('/denuncias', [DenunciaController::class, 'index'])->name('denuncias.index');
    Route::get('/denuncias/criar', [DenunciaController::class, 'create'])->name('denuncias.create');
    Route::post('/denuncias', [DenunciaController::class, 'store'])->name('denuncias.store');
    Route::get('/denuncias/{denuncia}', [DenunciaController::class, 'show'])->name('denuncias.show');
    Route::get('/denuncias/{denuncia}/editar', [DenunciaController::class, 'edit'])->name('denuncias.edit');
    Route::put('/denuncias/{denuncia}', [DenunciaController::class, 'update'])->name('denuncias.update');
    Route::delete('/denuncias/{denuncia}', [DenunciaController::class, 'destroy'])->name('denuncias.destroy');

    // Rotas de Usuários
    Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::get('/usuarios/criar', [UserController::class, 'create'])->name('usuarios.create');
    Route::post('/usuarios', [UserController::class, 'store'])->name('usuarios.store');
    Route::get('/usuarios/{user}/editar', [UserController::class, 'edit'])->name('usuarios.edit');
    Route::put('/usuarios/{user}', [UserController::class, 'update'])->name('usuarios.update');
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('usuarios.destroy');

    Route::get('/notificacoes', function () {
        return Inertia::render('admin/AdminNotificacoes');
    })->name('notificacoes');

    Route::get('/configuracoes', function () {
        return Inertia::render('admin/AdminConfiguracoes');
    })->name('configuracoes');

    // Rota de Relatórios
    Route::get('/relatorios', [DenunciaController::class, 'reports'])->name('relatorios');
});

// API Routes para denúncias
Route::post('/denuncias', [DenunciaController::class, 'store'])->name('denuncias.store');

Route::middleware(['auth'])->group(function () {
    Route::put('/denuncias/{denuncia}', [DenunciaController::class, 'update'])->name('denuncias.update');
    Route::delete('/denuncias/{denuncia}', [DenunciaController::class, 'destroy'])->name('denuncias.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
