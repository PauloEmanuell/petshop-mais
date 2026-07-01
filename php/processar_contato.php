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
$campos_obrigatorios = ['nome', 'email', 'assunto', 'mensagem'];
foreach ($campos_obrigatorios as $campo) {
    if (empty($dados[$campo])) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => "Campo '$campo' é obrigatório"
        ]);
        exit;
    }
}

// Validar email
if (!filter_var($dados['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Email inválido'
    ]);
    exit;
}

// Validar telefone se fornecido
if (!empty($dados['telefone'])) {
    if (!preg_match('/^[\d\s\-\(\)]+$/', $dados['telefone']) || strlen(preg_replace('/\D/', '', $dados['telefone'])) < 10) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Telefone inválido'
        ]);
        exit;
    }
}

// Preparar dados para salvar
$contato = [
    'id' => uniqid(),
    'nome' => sanitizar($dados['nome']),
    'email' => sanitizar($dados['email']),
    'telefone' => sanitizar($dados['telefone'] ?? ''),
    'assunto' => sanitizar($dados['assunto']),
    'mensagem' => sanitizar($dados['mensagem']),
    'data_criacao' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'desconhecido'
];

// Salvar em arquivo JSON (ou banco de dados)
$arquivo_contatos = __DIR__ . '/../dados/contatos.json';

// Criar diretório se não existir
if (!is_dir(__DIR__ . '/../dados')) {
    mkdir(__DIR__ . '/../dados', 0755, true);
}

// Ler contatos existentes
$contatos = [];
if (file_exists($arquivo_contatos)) {
    $contatos = json_decode(file_get_contents($arquivo_contatos), true) ?? [];
}

// Adicionar novo contato
$contatos[] = $contato;

// Salvar arquivo
if (file_put_contents($arquivo_contatos, json_encode($contatos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    // Enviar email de confirmação
    enviarEmailContato($contato);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Mensagem enviada com sucesso!',
        'id_contato' => $contato['id']
    ]);
} else {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao salvar mensagem'
    ]);
}

// Função para sanitizar dados
function sanitizar($dados) {
    return htmlspecialchars(strip_tags(trim($dados)), ENT_QUOTES, 'UTF-8');
}

// Função para enviar email de confirmação
function enviarEmailContato($contato) {
    // Email para o administrador
    $para_admin = 'contato@petshoponline.com';
    $assunto_admin = 'Novo Contato - Petshop Online';
    
    $mensagem_admin = "Nova mensagem de contato:\n\n";
    $mensagem_admin .= "Nome: " . $contato['nome'] . "\n";
    $mensagem_admin .= "Email: " . $contato['email'] . "\n";
    if (!empty($contato['telefone'])) {
        $mensagem_admin .= "Telefone: " . $contato['telefone'] . "\n";
    }
    $mensagem_admin .= "Assunto: " . $contato['assunto'] . "\n";
    $mensagem_admin .= "Mensagem: " . $contato['mensagem'] . "\n";
    $mensagem_admin .= "Data: " . $contato['data_criacao'] . "\n";
    $mensagem_admin .= "IP: " . $contato['ip'] . "\n";
    
    $headers = "From: noreply@petshoponline.com\r\n";
    $headers .= "Reply-To: " . $contato['email'] . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Descomente a linha abaixo se o servidor de email estiver configurado
    // mail($para_admin, $assunto_admin, $mensagem_admin, $headers);

    // Email de confirmação para o cliente
    $para_cliente = $contato['email'];
    $assunto_cliente = 'Confirmação de Contato - Petshop Online';
    
    $mensagem_cliente = "Olá " . $contato['nome'] . ",\n\n";
    $mensagem_cliente .= "Obrigado por entrar em contato conosco!\n";
    $mensagem_cliente .= "Recebemos sua mensagem e responderemos em breve.\n\n";
    $mensagem_cliente .= "Detalhes da sua mensagem:\n";
    $mensagem_cliente .= "Assunto: " . $contato['assunto'] . "\n";
    $mensagem_cliente .= "Data: " . $contato['data_criacao'] . "\n\n";
    $mensagem_cliente .= "Atenciosamente,\n";
    $mensagem_cliente .= "Equipe Petshop Online\n";
    
    // Descomente a linha abaixo se o servidor de email estiver configurado
    // mail($para_cliente, $assunto_cliente, $mensagem_cliente, $headers);
}
?>
