<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Denuncia extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'localizacao',
        'contato',
        'status',
        'usuario_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function arquivos(): HasMany
    {
        return $this->hasMany(ArquivoDenuncia::class);
    }

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class);
    }
}
