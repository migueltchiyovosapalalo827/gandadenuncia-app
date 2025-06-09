<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotificacaoController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminNotificacoes');
    }
} 