<?php
// Configurar headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Receber dados JSON
$input = file_get_contents('php://input');
$dados = json_decode($input, true);

// Validar dados
if (!$dados) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Dados inválidos'
    ]);
    exit;
}

// Validar campos obrigatórios
$campos_obrigatorios = ['servico', 'nomePet', 'tipoPet', 'data', 'hora', 'nomeCliente', 'telefone'];
foreach ($campos_obrigatorios as $campo) {
    if (empty($dados[$campo])) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => "Campo '$campo' é obrigatório"
        ]);
        exit;
    }
}

// Validar data (não pode ser no passado)
$data_agendamento = strtotime($dados['data'] . ' ' . $dados['hora']);
$data_atual = time();

if ($data_agendamento < $data_atual) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A data e hora do agendamento não podem ser no passado'
    ]);
    exit;
}

// Validar telefone
if (!preg_match('/^[\d\s\-\(\)]+$/', $dados['telefone']) || strlen(preg_replace('/\D/', '', $dados['telefone'])) < 10) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Telefone inválido'
    ]);
    exit;
}

// Preparar dados para salvar
$agendamento = [
    'id' => uniqid(),
    'servico' => sanitizar($dados['servico']),
    'nomePet' => sanitizar($dados['nomePet']),
    'tipoPet' => sanitizar($dados['tipoPet']),
    'data' => sanitizar($dados['data']),
    'hora' => sanitizar($dados['hora']),
    'nomeCliente' => sanitizar($dados['nomeCliente']),
    'telefone' => sanitizar($dados['telefone']),
    'data_criacao' => date('Y-m-d H:i:s')
];

// Salvar em arquivo JSON (ou banco de dados)
$arquivo_agendamentos = __DIR__ . '/../dados/agendamentos.json';

// Criar diretório se não existir
if (!is_dir(__DIR__ . '/../dados')) {
    mkdir(__DIR__ . '/../dados', 0755, true);
}

// Ler agendamentos existentes
$agendamentos = [];
if (file_exists($arquivo_agendamentos)) {
    $agendamentos = json_decode(file_get_contents($arquivo_agendamentos), true) ?? [];
}

// Adicionar novo agendamento
$agendamentos[] = $agendamento;

// Salvar arquivo
if (file_put_contents($arquivo_agendamentos, json_encode($agendamentos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    // Enviar email de confirmação (opcional)
    enviarEmailAgendamento($agendamento);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Agendamento realizado com sucesso!',
        'id_agendamento' => $agendamento['id']
    ]);
} else {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao salvar agendamento'
    ]);
}

// Função para sanitizar dados
function sanitizar($dados) {
    return htmlspecialchars(strip_tags(trim($dados)), ENT_QUOTES, 'UTF-8');
}

// Função para enviar email de confirmação
function enviarEmailAgendamento($agendamento) {
    $para = 'contato@petshoponline.com';
    $assunto = 'Novo Agendamento - Petshop Online';
    
    $mensagem = "Novo agendamento realizado:\n\n";
    $mensagem .= "Serviço: " . $agendamento['servico'] . "\n";
    $mensagem .= "Pet: " . $agendamento['nomePet'] . " (" . $agendamento['tipoPet'] . ")\n";
    $mensagem .= "Data: " . $agendamento['data'] . "\n";
    $mensagem .= "Hora: " . $agendamento['hora'] . "\n";
    $mensagem .= "Cliente: " . $agendamento['nomeCliente'] . "\n";
    $mensagem .= "Telefone: " . $agendamento['telefone'] . "\n";
    
    $headers = "From: noreply@petshoponline.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Descomente a linha abaixo se o servidor de email estiver configurado
    // mail($para, $assunto, $mensagem, $headers);
}
?>
