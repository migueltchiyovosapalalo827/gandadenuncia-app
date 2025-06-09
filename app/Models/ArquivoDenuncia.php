<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArquivoDenuncia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'caminho',
        'tipo',
        'tamanho',
        'descricao',
        'denuncia_id'
    ];

    protected $casts = [
        'tamanho' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function denuncia(): BelongsTo
    {
        return $this->belongsTo(Denuncia::class);
    }
} 