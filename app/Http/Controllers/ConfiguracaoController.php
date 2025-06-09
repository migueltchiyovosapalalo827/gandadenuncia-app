<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ConfiguracaoController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/AdminConfiguracoes');
    }
} 