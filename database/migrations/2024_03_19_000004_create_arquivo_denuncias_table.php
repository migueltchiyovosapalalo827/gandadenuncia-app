<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('arquivo_denuncias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('denuncia_id')->constrained()->onDelete('cascade');
            $table->string('nome');
            $table->string('caminho');
            $table->string('tipo');
            $table->bigInteger('tamanho');
            $table->string('descricao')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arquivo_denuncias');
    }
}; 